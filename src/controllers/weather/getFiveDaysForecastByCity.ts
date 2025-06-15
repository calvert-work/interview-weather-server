import axios, { AxiosError } from "axios";
import { Request, Response } from "express";

export const getFiveDaysForecastByCity = async (req: Request, res: Response) => {
	const city = req.params.city;
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY as string;
	const weatherUrl = process.env.OPEN_WEATHER_URL as string;

	try {
		const response = await axios.get(`${weatherUrl}/forecast`, {
			params: {
				q: city,
				appid: weatherApiKey,
				units: "metric"
			}
		});

		res.status(200).json(response.data);
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