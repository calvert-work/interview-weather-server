import { Router } from "express";
import { deleteFavoriteCity } from "../controllers/favoriteCity/deleteFavoriteCity";

export const delRouter = Router();

// added this route to handle the situation where path param isn't provided
delRouter.delete("/api/weather/favorites/", deleteFavoriteCity);
delRouter.delete("/api/weather/favorites/:id", deleteFavoriteCity);