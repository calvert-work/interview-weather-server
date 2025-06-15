import { Router } from "express";
import { saveFavoriteCity } from "../controllers/favoriteCity/saveFavoriteCity";
import { saveNewUser } from "../controllers/user/saveNewUser";

export const postRouter = Router();

/**
 * Store one new city to favorite list
 */
postRouter.post("/api/weather/favorites", saveFavoriteCity);

/**
 * Register new user
 */
postRouter.post("/api/weather/user", saveNewUser);
