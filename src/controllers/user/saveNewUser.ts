import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE } from "../../constants/constants";
import { isEmail } from "../../utils/isEmail";
import { SaveNewUserDto } from "../../dto/user/SaveNewUserDto";

export const saveNewUser = async (req: Request, res: Response) => {
	const { firstName, email } = req.body as SaveNewUserDto;

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
		const [userId] = await pgInstance(DB_TABLE.USERS).insert({ email, first_name: firstName }).onConflict("email").ignore().returning("id");

		if (userId) {
			res.status(201).json({
				message: "User saved successfully"
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