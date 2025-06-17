import { http, HttpResponse, passthrough } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { GetForecastWeatherByCityRequestDto } from "../../../../src/dto/weather/GetForecastWeatherByCityRequestDto";

/**
 * Bypass response mocking for this route
 */
export const mockGetFiveDaysForecastByCity = http.get("*/api/weather/forecast/:city", ({ params }) => {
	const { city } = params as GetForecastWeatherByCityRequestDto;

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
