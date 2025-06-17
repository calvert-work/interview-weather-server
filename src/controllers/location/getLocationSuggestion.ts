import { Request, Response } from "express";
import { GetLocationSuggestionDto } from "../../dto/location/GetLocationSuggestionDto";
import axios, { AxiosError } from "axios";

export const getLocationSuggestion = async (req: Request, res: Response) => {
	const { city } = req.params as GetLocationSuggestionDto;
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY as string;
	const geoUrl = process.env.OPEN_WEATHER_GEO_URL as string;

	try {
		const response = await axios.get(`${geoUrl}/direct`, {
			params: {
				q: city,
				limit: 6, // show top 6 location suggestions
				appid: weatherApiKey
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