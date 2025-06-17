import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, FAVORITE_CITY_COLUMNS } from "../../constants/dbConstants";
import { SaveFavoriteCityRequestDto } from "../../dto/favoriteCity/SaveFavoriteCityRequestDto";

export const saveFavoriteCity = async (req: Request, res: Response) => {
	const { city, countryCode } = req.body as SaveFavoriteCityRequestDto;
	const userId = req.headers["user-id"];

	if (!city || !countryCode) {
		res.status(400).json({
			message: "Missing information"
		});
		return;
	}

	try {
		const [favoriteCity] = await pgInstance(DB_TABLE.FAVORITE_CITY)
			.insert({
				[FAVORITE_CITY_COLUMNS.CITY_NAME]: city,
				[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: countryCode,
				[FAVORITE_CITY_COLUMNS.USER_ID]: userId
			})
			.onConflict([FAVORITE_CITY_COLUMNS.USER_ID, FAVORITE_CITY_COLUMNS.CITY_NAME])
			.ignore()
			.returning("*");


		if (favoriteCity) {
			res.status(201).json({
				message: "Favorite city added successfully",
				data: favoriteCity
			});
		} else {
			res.status(409).json({
				message: "Favorite city already exist"
			});
		}
	} catch {
		res.status(500).json({
			message: "Server error while saving favorite city"
		});
	}
};