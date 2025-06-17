import { http, HttpResponse, passthrough } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { GetCurrentWeatherByCityRequestDto } from "../../../../src/dto/weather/GetCurrentWeatherByCityRequestDto";

/**
 * Bypass response mocking for this route
 */
export const mockGetCurrentWeatherByCity = http.get("*/api/weather/current/:city", ({ params }) => {
	const { city } = params as GetCurrentWeatherByCityRequestDto;

	if (city === "invalid") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock invalid city"
		}, { status: 404 });
	} else if (city === "error") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock generic error response"
		}, { status: 500 });
	}

	return passthrough();
});
