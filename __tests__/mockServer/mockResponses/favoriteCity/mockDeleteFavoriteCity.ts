import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { DeleteFavoriteCityRequestDto } from "../../../../src/dto/favoriteCity/DeleteFavoriteCityRequestDto";

/**
 * Delete favorite city endpoint mock response
 */
export const mockDeleteFavoriteCity = http.delete("*/api/weather/favorites/:id?", async ({ params }) => {
	const { id } = params as DeleteFavoriteCityRequestDto;

	if (!id) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information"
		}, { status: 400 });
	}


	if (id === "mock-fav-city-id") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock favorite city deleted successfully"
		}, { status: 200 });
	}

	if (id === "non-existent-id") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock favorite city not found"
		}, { status: 404 });
	}

	if (id === "error") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while deleting favorite city"
		}, { status: 500 });
	}
});
