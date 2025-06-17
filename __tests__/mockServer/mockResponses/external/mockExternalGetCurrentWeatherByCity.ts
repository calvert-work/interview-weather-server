import { http, HttpResponse } from "msw";

/**
 * Instead of hitting the actual open weather api for test case, return this mock response instead
 */
export const mockExternalGetCurrentWeatherByCity = http.get("https://api.openweathermap.org/data/2.5/weather", () => {
	return HttpResponse.json({ message: "Mock weather data" }, { status: 200 });
});
