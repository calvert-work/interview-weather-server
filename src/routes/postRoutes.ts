import { Router } from "express";
import { saveFavoriteCity } from "../controllers/favoriteCity/saveFavoriteCity";
import { saveNewUser } from "../controllers/user/saveNewUser";

export const postRouter = Router();

postRouter.post("/api/weather/favorites", saveFavoriteCity);

postRouter.post("/api/weather/user", saveNewUser);
