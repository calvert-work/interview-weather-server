import { Request, Response } from "express";

export const healthcheck = (_: Request, res: Response) => {
	res.status(200).json({
		name: "Weather app server",
		env: "development",
		status: "OK",
	});
};