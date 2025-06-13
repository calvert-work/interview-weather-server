import { http, HttpResponse, passthrough } from "msw";

/**
 * Bypass response mocking for this route
 */
export const mockGetFiveDaysForecastByCity = http.get("*/api/weather/forecast/*", ({ request }) => {
	if (request.url.endsWith("invalid")) {
		return HttpResponse.json({
			message: "Mock invalid city"
		}, { status: 404 });
	} else if (request.url.endsWith("error")) {
		return HttpResponse.json({
			message: "Mock generic error response"
		}, { status: 500 });
	}

	return passthrough();
});
