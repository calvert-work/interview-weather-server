import { mockGetCurrentWeatherByCity } from "./mockResponses/mockGetCurrentWeatherByCity";
import { mockExternalWeatherApiResponse } from "./mockResponses/mockExternalWeatherApiResponse";
import { mockHealthcheck } from "./mockResponses/mockHealthcheck";

export const handlers = [
	mockGetCurrentWeatherByCity,
	mockExternalWeatherApiResponse,
	mockHealthcheck
];