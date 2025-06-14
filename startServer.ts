import { Express } from "express";

export const startServer = (server: Express) => {
	const port = process.env.SERVER_PORT;

	if (!port) {
		if (process.env.NODE_ENV === "development") {
			console.log("Server port is undefined, exiting...");
		}
		process.exit(1);
	}

	server.listen(process.env.SERVER_PORT, () => {
		if (process.env.NODE_ENV === "development") {
			console.log(`Server is running on port ${process.env.SERVER_PORT}`);
		}
	});
};