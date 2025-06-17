import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { SaveFavoriteCityRequestDto } from "../../../../src/dto/favoriteCity/SaveFavoriteCityRequestDto";

/**
 * Save favorite city endpoint mock response
 */
export const mockSaveFavoriteCity = http.post("*/api/weather/favorites", async ({ request }) => {
	const { city, countryCode } = await request.json() as SaveFavoriteCityRequestDto;
	const userId = request.headers.get("user-id");

	if (!city || !countryCode || !userId) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information"
		}, { status: 400 });
	}

	if (userId === "non-existent-id") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while saving favorite city"
		}, { status: 500 });
	}

	if (city === "Austin" && userId === "mock-user-id") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock favorite city added successfully"
		}, { status: 201 });
	}

	if (city === "Austin" && userId === "already-exist") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock favorite city already exist"
		}, { status: 409 });
	}
});
