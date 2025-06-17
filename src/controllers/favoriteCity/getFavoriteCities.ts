import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, FAVORITE_CITY_COLUMNS } from "../../constants/dbConstants";
import { GetFavoriteCitiesRequestDto } from "../../dto/favoriteCity/GetFavoriteCitiesRequestDto";

export const getFavoriteCities = async (req: Request, res: Response) => {
	const { userId } = req.query as GetFavoriteCitiesRequestDto;

	if (!userId) {
		res.status(400).json({
			message: "Missing information"
		});
		return;
	}

	try {
		const favoriteCities = await pgInstance(DB_TABLE.FAVORITE_CITY)
			.select("*")
			.where({ [FAVORITE_CITY_COLUMNS.USER_ID]: userId });

		if (favoriteCities.length > 0) {
			res.status(200).json({
				message: "Favorite cities found",
				data: favoriteCities
			});
		} else {
			res.status(404).json({
				message: "Favorite cities not found"
			});
		}
	} catch {
		res.status(500).json({
			message: "Server error while retrieving favorite cities"
		});
	}
};