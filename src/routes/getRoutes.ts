import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";
import { getCurrentWeatherByCity } from "../controllers/weather/getCurrentWeatherByCity";
import { rateLimiter } from "../middlewares/limiters/rateLimiter";
import { hasCityValueCheck } from "../middlewares/validators/hasCityValueCheck";
import { openWeatherApiDetailsCheck } from "../middlewares/validators/openWeatherApiDetailsCheck";
import { getFiveDaysForecastByCity } from "../controllers/weather/getFiveDaysForecastByCity";
import { getFavoriteCities } from "../controllers/favoriteCity/getFavoriteCities";
import { getSearchHistory } from "../controllers/searchHistory/getSearchHistory";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";
import { getLocationSuggestion } from "../controllers/location/getLocationSuggestion";

export const getRouter = Router();

/**
 * Health check route to verify if the server is running
 */
getRouter.get("/healthcheck", healthcheck);

getRouter.get("/api/location/suggestion{/:city}", hasCityValueCheck, openWeatherApiDetailsCheck, getLocationSuggestion);

/**
 * Get current weather by city, state, and country code, city path param value can be "las vegas,nv,us" or "las vegas" or "las vegas,us" but not "las vegas,nv". 
 * If state is provided, it must followed by the country code
 * 
 * Conditions:
 * 1) Rate limited to 10 requests per 30 secs
 * 2) Must have city value provided
 * 3) Must have weather api key and url
 */
getRouter.get("/api/weather/current{/:city}", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getCurrentWeatherByCity);

/**
 * Forecase 5 days weather by city, state, and country code, city path param value can be "las vegas,nv,us" or "las vegas" or "las vegas,us" but not "las vegas,nv". 
 * If state is provided, it must followed by the country code
 * 
 * Conditions:
 * 1) Rate limited to 10 requests per 30 secs
 * 2) Must have city value provided
 * 3) Must have weather api key and url
 */
getRouter.get("/api/weather/forecast{/:city}", rateLimiter, hasCityValueCheck, openWeatherApiDetailsCheck, getFiveDaysForecastByCity);

/**
 * Get all stored favorite cities
 */
getRouter.get("/api/weather/favorites", getFavoriteCities);

/**
 * Get all stored weather history
 */
getRouter.get("/api/weather/history", headerHasUserIdCheck, getSearchHistory);