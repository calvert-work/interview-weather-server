import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";

export const getRouter = Router();

getRouter.get("/healthcheck", healthcheck);