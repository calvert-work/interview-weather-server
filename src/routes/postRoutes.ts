import { Router } from "express";
import { saveFavoriteCity } from "../controllers/favoriteCity/saveFavoriteCity";
import { saveNewUser } from "../controllers/user/saveNewUser";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";
import { loginUser } from "../controllers/user/loginUser";

export const postRouter = Router();

/**
 * Store one new city to favorite list
 */
postRouter.post("/api/weather/favorites", headerHasUserIdCheck, saveFavoriteCity);

/**
 * Register new user
 */
postRouter.post("/api/weather/register", saveNewUser);

/**
 * Get "registered" user details.
 * 
 * Only those with a registered account can have their search history stored and city to be added to favorite
 */
postRouter.post("/api/weather/login", loginUser);
