import { NextFunction, Request, Response } from "express";

export const openWeatherApiDetailsCheck = (_: Request, res: Response, next: NextFunction) => {
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;
	const weatherUrl = process.env.OPEN_WEATHER_URL;

	if (!weatherApiKey) {
		res.status(500).json({
			message: "Missing weather api information"
		});
		return;
	}

	if (!weatherUrl) {
		res.status(500).json({
			message: "Missing weather api information"
		});
		return;
	}

	next();
};