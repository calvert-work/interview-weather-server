import { mockGetCurrentWeatherByCity } from "./mockResponses/weather/mockGetCurrentWeatherByCity";
import { mockExternalGetCurrentWeatherByCity } from "./mockResponses/external/mockExternalGetCurrentWeatherByCity";
import { mockHealthcheck } from "./mockResponses/mockHealthcheck";
import { mockExternalGetFiveDaysForecastByCity } from "./mockResponses/external/mockExternalGetFiveDaysForecastByCity";
import { mockGetFiveDaysForecastByCity } from "./mockResponses/weather/mockGetFiveDaysForecastByCity";
import { mockLoginUser } from "./mockResponses/user/mockLoginUser";
import { mockSaveNewUser } from "./mockResponses/user/mockSaveNewUser";
import { mockSaveFavoriteCity } from "./mockResponses/favoriteCity/mockSaveFavoriteCity";
import { mockGetFavoriteCities } from "./mockResponses/favoriteCity/mockGetFavoriteCities";
import { mockDeleteFavoriteCity } from "./mockResponses/favoriteCity/mockDeleteFavoriteCity";
import { mockGetSearchHistory } from "./mockResponses/searchHistory/mockGetSearchHistory";
import { mockDeleteSearchHistory } from "./mockResponses/searchHistory/mockDeleteSearchHistory";

export const handlers = [
	mockGetCurrentWeatherByCity,
	mockGetFiveDaysForecastByCity,
	mockExternalGetCurrentWeatherByCity,
	mockExternalGetFiveDaysForecastByCity,
	mockHealthcheck,
	mockLoginUser,
	mockSaveNewUser,
	mockSaveFavoriteCity,
	mockGetFavoriteCities,
	mockDeleteFavoriteCity,
	mockGetSearchHistory,
	mockDeleteSearchHistory
];