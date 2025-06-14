import { mockGetCurrentWeatherByCity } from "./mockResponses/weather/mockGetCurrentWeatherByCity";
import { mockExternalGetCurrentWeatherByCity } from "./mockResponses/external/mockExternalGetCurrentWeatherByCity";
import { mockHealthcheck } from "./mockResponses/mockHealthcheck";
import { mockExternalGetFiveDaysForecastByCity } from "./mockResponses/external/mockExternalGetFiveDaysForecastByCity";
import { mockGetFiveDaysForecastByCity } from "./mockResponses/weather/mockGetFiveDaysForecastByCity";
import { mockGetUser } from "./mockResponses/user/mockGetUser";
import { mockSaveNewUser } from "./mockResponses/user/mockSaveNewUser";
import { mockSaveFavoriteCity } from "./mockResponses/favoriteCity/mockSaveFavoriteCity";
import { mockGetFavoriteCities } from "./mockResponses/favoriteCity/mockGetFavoriteCities";

export const handlers = [
	mockGetCurrentWeatherByCity,
	mockGetFiveDaysForecastByCity,
	mockExternalGetCurrentWeatherByCity,
	mockExternalGetFiveDaysForecastByCity,
	mockHealthcheck,
	mockGetUser,
	mockSaveNewUser,
	mockSaveFavoriteCity,
	mockGetFavoriteCities
];