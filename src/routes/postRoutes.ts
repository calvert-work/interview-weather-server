import { Router } from "express";
import { saveFavoriteCity } from "../controllers/favoriteCity/saveFavoriteCity";

export const postRouter = Router();

postRouter.post("/api/weather/favorites", saveFavoriteCity);