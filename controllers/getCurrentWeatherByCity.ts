import axios from "axios";
import { Request, Response } from "express";

export const getCurrentWeatherByCity = async (req: Request, res: Response) => {
	const city = req.params.city;
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;
	const weatherUrl = process.env.OPEN_WEATHER_URL;

	if (!city) {
		res.status(400).json({
			message: "Invalid user input: city is not provided"
		});
		return;
	}

	if (!weatherApiKey) {
		res.status(500).json({
			message: "Invalid weather api key"
		});
		return;
	}

	if (!weatherUrl) {
		res.status(500).json({
			message: "Invalid weather url"
		});
		return;
	}

	try {
		const response = await axios.get(weatherUrl, {
			params: {
				q: city,
				appid: weatherApiKey,
				units: "metric"
			}
		});

		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({
			message: "Server error while getting current weather",
			error: error
		});
	}
};