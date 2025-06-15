import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { MessageWithDataResponse } from "../../../../src/dto/apiResponse/MessageWithDataResponse";
import { WEATHER_HISTORY_COLUMNS } from "../../../../src/constants/dbConstants";

export const mockGetSearchHistory = http.get("*/api/weather/history", async ({ request }) => {
	const userId = request.headers.get("user-id");

	if (!userId) {
		return HttpResponse.json<MessageResponse>(
			{ message: "Mock missing information" },
			{ status: 400 }
		);
	}

	if (userId === "mock-user-id") {
		return HttpResponse.json<MessageWithDataResponse>(
			{
				message: "Mock weather history found",
				data: [
					{
						[WEATHER_HISTORY_COLUMNS.ID]: "mock-id-1",
						[WEATHER_HISTORY_COLUMNS.CITY_NAME]: "Austin",
						[WEATHER_HISTORY_COLUMNS.COUNTRY_CODE]: "US",
						[WEATHER_HISTORY_COLUMNS.USER_ID]: userId,
						[WEATHER_HISTORY_COLUMNS.WEATHER_DATA]: "{}"
					}
				]
			},
			{ status: 200 }
		);
	}

	if (userId === "notfound") {
		return HttpResponse.json<MessageResponse>(
			{ message: "Mock weather history not found" },
			{ status: 404 }
		);
	}

	if (userId === "error") {
		return HttpResponse.json<MessageResponse>(
			{ message: "Mock server error while retrieving weather history" },
			{ status: 500 }
		);
	}
});
