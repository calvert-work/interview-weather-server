import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";
import { getCurrentWeatherByCity } from "../controllers/weather/getCurrentWeatherByCity";
import { rateLimiter } from "../middlewares/limiters/rateLimiter";
import { hasCityValueCheck } from "../middlewares/validators/hasCityValueCheck";
import { openWeatherApiDetailsCheck } from "../middlewares/validators/openWeatherApiDetailsCheck";
import { getFiveDaysForecastByCity } from "../controllers/weather/getFiveDaysForecastByCity";
import { getUser } from "../controllers/user/getUser";
import { getFavoriteCities } from "../controllers/favoriteCity/getFavoriteCities";
import { getSearchHistory } from "../controllers/searchHistory/getSearchHistory";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";

export const getRouter = Router();

getRouter.get("/healthcheck", healthcheck);

getRouter.get("/api/weather/current{/:city}", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getCurrentWeatherByCity);

getRouter.get("/api/weather/forecast/:city", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getFiveDaysForecastByCity);

getRouter.get("/api/weather/user/:email", getUser);

getRouter.get("/api/weather/favorites", getFavoriteCities);

getRouter.get("/api/weather/history", headerHasUserIdCheck, getSearchHistory);