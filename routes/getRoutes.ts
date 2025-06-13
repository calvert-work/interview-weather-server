import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";
import { getCurrentWeatherByCity } from "../controllers/getCurrentWeatherByCity";
import { rateLimiter } from "../middlewares/rateLimiter";

export const getRouter = Router();

getRouter.get("/healthcheck", healthcheck);

getRouter.get("/api/weather/current/:city", rateLimiter, getCurrentWeatherByCity);