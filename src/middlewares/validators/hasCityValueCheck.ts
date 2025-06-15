import { NextFunction, Request, Response } from "express";

/**
 * Check if city is present as a value in the path param of a route
 */
export const hasCityValueCheck = (req: Request, res: Response, next: NextFunction) => {
	const { city } = req.params;

	if (!city) {
		res.status(400).json({
			message: "Missing information" // return vague message for security reasons
		});
		return;
	}

	next();
};