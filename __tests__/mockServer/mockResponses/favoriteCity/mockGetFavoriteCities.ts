import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { MessageWithDataResponse } from "../../../../src/dto/apiResponse/MessageWithDataResponse";
import { FAVORITE_CITY_COLUMNS } from "../../../../src/constants/dbConstants";

/**
 * Get favorite cities endpoint mock response
 */
export const mockGetFavoriteCities = http.get("*/api/weather/favorites", ({ request }) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get("userId");

	if (!userId) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information"
		}, { status: 400 });
	}

	if (userId === "error") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while retrieving favorite cities"
		}, { status: 500 });
	}

	if (userId === "mock-user-id") {
		return HttpResponse.json<MessageWithDataResponse>({
			message: "Mock favorite cities found",
			data: [
				{
					[FAVORITE_CITY_COLUMNS.ID]: "mock-city-id-1",
					[FAVORITE_CITY_COLUMNS.CITY_NAME]: "Austin",
					[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: "US",
					[FAVORITE_CITY_COLUMNS.USER_ID]: "mock-user-id"
				},
				{
					[FAVORITE_CITY_COLUMNS.ID]: "mock-city-id-2",
					[FAVORITE_CITY_COLUMNS.CITY_NAME]: "Dallas",
					[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: "US",
					[FAVORITE_CITY_COLUMNS.USER_ID]: "mock-user-id"
				}
			]
		}, { status: 200 });
	}

	if (userId === "no-cities") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock favorite cities not found"
		}, { status: 404 });
	}
});
