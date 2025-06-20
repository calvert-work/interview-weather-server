import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { isEmail } from "../../utils/isEmail";
import { DB_TABLE, USERS_COLUMNS } from "../../constants/dbConstants";
import { LoginUserRequestDto } from "../../dto/user/LoginUserRequestDto";

export const loginUser = async (req: Request, res: Response) => {
	const { email } = req.body as LoginUserRequestDto;

	if (!email) {
		res.status(400).json({
			message: "Missing information"
		});
		return;
	}

	if (!isEmail(email)) {
		res.status(400).json({
			message: "Bad user input"
		});
		return;
	}

	try {
		const [user] = await pgInstance(DB_TABLE.USERS)
			.select([
				USERS_COLUMNS.ID,
				USERS_COLUMNS.FIRST_NAME,
				USERS_COLUMNS.EMAIL
			])
			.where({ [USERS_COLUMNS.EMAIL]: email });

		if (user) {
			res.status(200).json({
				message: "User found",
				data: user
			});
		} else {
			res.status(404).json({
				message: "User not found"
			});
		}
	} catch {
		res.status(500).json({
			message: "Server error while retrieving user"
		});
	}
};