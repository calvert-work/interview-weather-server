import { NextFunction, Request, Response } from "express";

/**
 * Some routes require user id to be present in their header
 */
export const headerHasUserIdCheck = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.headers["user-id"];

	if (!userId) {
		res.status(400).json({
			message: "Missing header information" // return vague message for security reasons
		});
		return;
	}

	next();
};