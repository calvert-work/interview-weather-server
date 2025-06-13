import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";
import { getCurrentWeatherByCity } from "../controllers/getCurrentWeatherByCity";
import { rateLimiter } from "../middlewares/rateLimiter";
import { hasCityValueCheck } from "../middlewares/hasCityValueCheck";
import { openWeatherApiDetailsCheck } from "../middlewares/openWeatherApiDetailsCheck";
import { getFiveDaysForecastByCity } from "../controllers/getFiveDaysForecastByCity";

export const getRouter = Router();

getRouter.get("/healthcheck", healthcheck);

getRouter.get("/api/weather/current/:city", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getCurrentWeatherByCity);

getRouter.get("/api/weather/forecast/:city", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getFiveDaysForecastByCity);