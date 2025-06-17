import "dotenv/config";
import express from "express";

import { getRouter } from "./src/routes/getRoutes";
import { startServer } from "./startServer";
import { postRouter } from "./src/routes/postRoutes";
import { expressConfigs } from "./src/middlewares/configs/expressConfigs";
import { delRouter } from "./src/routes/delRoutes";

export const server = express();

// invoke default middlewares
expressConfigs();

server.use(getRouter);
server.use(postRouter);
server.use(delRouter);

startServer(server);