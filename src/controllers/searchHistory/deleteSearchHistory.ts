import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, WEATHER_HISTORY_COLUMNS } from "../../constants/dbConstants";

export const deleteSearchHistory = async (req: Request, res: Response) => {
	const userId = req.headers["user-id"];

	try {
		const deletedCount = await pgInstance(DB_TABLE.WEATHER_HISTORY)
			.where({ [WEATHER_HISTORY_COLUMNS.USER_ID]: userId })
			.del();

		if (deletedCount > 0) {
			res.status(200).json({ message: "Weather history deleted successfully" });
		} else {
			res.status(404).json({ message: "No weather history found to delete" });
		}
	} catch {
		res.status(500).json({ message: "Server error while deleting weather history" });
	}
};
