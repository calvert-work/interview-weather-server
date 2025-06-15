import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, WEATHER_HISTORY_COLUMNS } from "../../constants/dbConstants";
import { GetCurrentWeatherByCityRequestDto } from "../../dto/weather/GetCurrentWeatherByCityRequestDto";

export const getCurrentWeatherByCity = async (req: Request, res: Response) => {
	const { city } = req.params as GetCurrentWeatherByCityRequestDto;
	const userId = req.headers["user-id"] as string;
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY as string;
	const weatherUrl = process.env.OPEN_WEATHER_URL as string;

	try {
		const response = await axios.get(`${weatherUrl}/weather`, {
			params: {
				q: city,
				appid: weatherApiKey,
				units: "metric"
			}
		});

		let historyStored = false;

		if (userId) {
			const [historyId] = await pgInstance(DB_TABLE.WEATHER_HISTORY).insert({
				[WEATHER_HISTORY_COLUMNS.USER_ID]: userId,
				[WEATHER_HISTORY_COLUMNS.CITY_NAME]: response.data.name,
				[WEATHER_HISTORY_COLUMNS.COUNTRY_CODE]: response.data.sys.country,
				[WEATHER_HISTORY_COLUMNS.WEATHER_DATA]: JSON.stringify(response.data)
			}).returning([WEATHER_HISTORY_COLUMNS.ID]);

			if (historyId) {
				historyStored = true;
			}
		}

		res.status(200).json({
			message: "Get weather successfully",
			data: response.data,
			historyStored
		});
	} catch (error) {
		if ((error as AxiosError).status === 404) {
			res.status(404).json({
				message: "Invalid city"
			});
		} else {
			res.status(500).json({
				message: "Server error while getting current weather by city",
			});
		}
	}
};