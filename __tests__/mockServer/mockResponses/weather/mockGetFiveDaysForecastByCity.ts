import { http, HttpResponse, passthrough } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";

/**
 * Bypass response mocking for this route
 */
export const mockGetFiveDaysForecastByCity = http.get("*/api/weather/forecast/*", ({ request }) => {
	if (request.url.endsWith("invalid")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock invalid city"
		}, { status: 404 });
	} else if (request.url.endsWith("error")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock generic error response"
		}, { status: 500 });
	}

	return passthrough();
});
