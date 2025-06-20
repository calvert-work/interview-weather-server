import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { isEmail } from "../../utils/isEmail";
import { DB_TABLE, USERS_COLUMNS } from "../../constants/dbConstants";
import { SaveNewUserRequestDto } from "../../dto/user/SaveNewUserRequestDto";

export const saveNewUser = async (req: Request, res: Response) => {
	const { firstName, email } = req.body as SaveNewUserRequestDto;

	if (!firstName || !email) {
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
		const [userId] = await pgInstance(DB_TABLE.USERS).insert({
			[USERS_COLUMNS.EMAIL]: email,
			[USERS_COLUMNS.FIRST_NAME]: firstName
		})
			.onConflict(USERS_COLUMNS.EMAIL)
			.ignore()
			.returning(USERS_COLUMNS.ID);

		if (userId) {
			res.status(201).json({
				message: "User saved successfully",
				data: {
					userId : userId.id
				}
			});
		} else {
			res.status(409).json({
				message: "User already exist"
			});
		}
	} catch {
		res.status(500).json({
			message: "Server error while saving new user"
		});
	}
};