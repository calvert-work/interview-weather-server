import { Express } from "express";

export const startServer = (server: Express) => {
	const port = process.env.SERVER_PORT;

	if (!port) {
		console.log("Server port is undefined, exiting...");
		process.exit(1);
	}

	server.listen(process.env.SERVER_PORT, () => {
		console.log(`Server is running on port ${process.env.SERVER_PORT}`);
	});
};