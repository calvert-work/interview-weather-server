import { Router } from "express";
import { deleteFavoriteCity } from "../controllers/favoriteCity/deleteFavoriteCity";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";
import { deleteSearchHistory } from "../controllers/searchHistory/deleteSearchHistory";

export const delRouter = Router();

// added this route to handle the situation where path param isn't provided
delRouter.delete("/api/weather/favorites/", deleteFavoriteCity);
delRouter.delete("/api/weather/favorites/:id", deleteFavoriteCity);

delRouter.delete("/api/weather/history", headerHasUserIdCheck, deleteSearchHistory);