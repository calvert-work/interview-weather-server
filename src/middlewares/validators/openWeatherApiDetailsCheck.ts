import { NextFunction, Request, Response } from "express";

/**
 * Check if open weather api has all info to be used
 */
export const openWeatherApiDetailsCheck = (_: Request, res: Response, next: NextFunction) => {
	const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;

	if (!weatherApiKey) {
		res.status(500).json({
			message: "Missing weather api information" // return vague message for security reasons
		});
		return;
	}

	next();
};