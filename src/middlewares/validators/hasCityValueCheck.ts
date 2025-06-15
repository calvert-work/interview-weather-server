import { NextFunction, Request, Response } from "express";

export const hasCityValueCheck = (req: Request, res: Response, next: NextFunction) => {
	const { city } = req.params;

	if (!city) {
		res.status(400).json({
			message: "Missing information"
		});
		return;
	}

	next();
};