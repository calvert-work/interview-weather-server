import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE, FAVORITE_CITY_COLUMNS } from "../../constants/dbConstants";
import { DeleteFavoriteCityRequestDto } from "../../dto/favoriteCity/DeleteFavoriteCityRequestDto";

export const deleteFavoriteCity = async (req: Request, res: Response) => {
	const { id } = req.params as DeleteFavoriteCityRequestDto;

	if (!id) {
		res.status(400).json({ message: "Missing information" });
		return;
	}

	try {
		const result = await pgInstance(DB_TABLE.FAVORITE_CITY)
			.where({
				[FAVORITE_CITY_COLUMNS.ID]: id,
			})
			.del();

		if (result === 1) {
			res.status(200).json({ message: "Favorite city deleted successfully" });
		} else {
			res.status(404).json({ message: "Favorite city not found" });
		}
	} catch {
		res.status(500).json({ message: "Server error while deleting favorite city" });
	}
};
