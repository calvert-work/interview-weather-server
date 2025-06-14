import { Request, Response } from "express";
import { pgInstance } from "../../db/pgInstance";
import { DB_TABLE } from "../../constants/constants";
import { isEmail } from "../../utils/isEmail";
import { GetUserDto } from "../../dto/user/GetUserDto";

export const getUser = async (req: Request, res: Response) => {
	const { email } = req.params as GetUserDto;

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
		const [user] = await pgInstance(DB_TABLE.USERS).select("first_name", "email").where({ email });

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