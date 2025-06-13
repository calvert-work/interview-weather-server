import { http, passthrough } from "msw";

/**
 * Bypass response mocking for this route
 */
export const mockGetCurrentWeatherByCity = http.get("*/api/weather/current/*", () => {
	return passthrough();
});
