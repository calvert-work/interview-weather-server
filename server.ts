import "dotenv/config";
import express from "express";

import { getRouter } from "./routes/getRoutes";
import { startServer } from "./startServer";

export const server = express();

server.use(getRouter);

startServer(server);