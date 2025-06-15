import { Router } from "express";
import { deleteFavoriteCity } from "../controllers/favoriteCity/deleteFavoriteCity";
import { headerHasUserIdCheck } from "../middlewares/validators/headerHasUserIdCheck";
import { deleteSearchHistory } from "../controllers/searchHistory/deleteSearchHistory";

export const delRouter = Router();

/**
 * Delete favorite city by favorite city id own by a user
 */
delRouter.delete("/api/weather/favorites{/:id}", deleteFavoriteCity);

/**
 * Delete all search history own by a user, user id has to present in the request header to pass the headerHasUserIdCheck
 */
delRouter.delete("/api/weather/history", headerHasUserIdCheck, deleteSearchHistory);