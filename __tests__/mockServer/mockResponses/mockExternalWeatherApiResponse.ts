import { http, HttpResponse } from "msw";

/**
 * Instead of hitting the actual open weather api for test case, return this mock response instead
 */
export const mockExternalWeatherApiResponse = http.get("https://api.openweathermap.org/data/2.5/weather", () => {
	return new HttpResponse({}, { status: 200 });
});
