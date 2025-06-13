import { mockGetCurrentWeatherByCity } from "./mockResponses/mockGetCurrentWeatherByCity";
import { mockExternalGetCurrentWeatherByCity } from "./mockResponses/external/mockExternalGetCurrentWeatherByCity";
import { mockHealthcheck } from "./mockResponses/mockHealthcheck";
import { mockExternalGetFiveDaysForecastByCity } from "./mockResponses/external/mockExternalGetFiveDaysForecastByCity";
import { mockGetFiveDaysForecastByCity } from "./mockResponses/mockGetFiveDaysForecastByCity";

export const handlers = [
	mockGetCurrentWeatherByCity,
	mockGetFiveDaysForecastByCity,
	mockExternalGetCurrentWeatherByCity,
	mockExternalGetFiveDaysForecastByCity,
	mockHealthcheck
];