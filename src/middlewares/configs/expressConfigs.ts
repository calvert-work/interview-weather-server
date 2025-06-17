import { server } from "../../../server";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const whitelist = process.env.UI_URL;

const corsOptions = {
	// eslint-disable-next-line no-unused-vars
	origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
		if (!origin) return callback(null, true);
		if (whitelist && origin === whitelist) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

export const expressConfigs = () => {
	server.use(express.json());
	server.use(express.urlencoded());

	server.use((_: Request, res: Response, next: NextFunction) => {
		res.header("Access-Control-Allow-Methods", "POST, OPTION, GET, DELETE");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
		next();
	});

	server.use(cors(corsOptions));
};