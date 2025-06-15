import { Router } from "express";
import { saveFavoriteCity } from "../controllers/favoriteCity/saveFavoriteCity";
import { saveNewUser } from "../controllers/user/saveNewUser";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";

export const postRouter = Router();

/**
 * Store one new city to favorite list
 */
postRouter.post("/api/weather/favorites", headerHasUserIdCheck, saveFavoriteCity);

/**
 * Register new user
 */
postRouter.post("/api/weather/user", saveNewUser);
