import { NextFunction, Request, Response } from "express";

export const headerHasUserIdCheck = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.headers["user-id"];

	if (!userId) {
		res.status(400).json({
			message: "Missing header information"
		});
		return;
	}

	next();
};