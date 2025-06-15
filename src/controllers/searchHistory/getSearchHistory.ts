import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, WEATHER_HISTORY_COLUMNS } from "../../constants/dbConstants";

export const getSearchHistory = async (req: Request, res: Response) => {
	const userId = req.headers["user-id"] as string;

	try {
		const weatherHistory = await pgInstance(DB_TABLE.WEATHER_HISTORY)
			.select("*")
			.where({ [WEATHER_HISTORY_COLUMNS.USER_ID]: userId })
			.orderBy(WEATHER_HISTORY_COLUMNS.CREATED_AT, "desc");

		if (weatherHistory.length > 0) {
			res.status(200).json({
				message: "Search history retrieved successfully",
				data: weatherHistory
			});
		} else {
			res.status(404).json({
				message: "No search history found"
			});
		}
	} catch {
		res.status(500).json({
			message: "Server error while retrieving search history"
		});
	}
};
