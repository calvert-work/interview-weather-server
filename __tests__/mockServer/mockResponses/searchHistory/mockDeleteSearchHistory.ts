import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";

/**
 * Delete weather history mock
 */
export const mockDeleteSearchHistory = http.delete("*/api/weather/history", async ({ request }) => {
	const userId = request.headers.get("user-id");
	
	if (userId === "mock-user-id") {
		return HttpResponse.json<MessageResponse>({ message: "Mock weather history deleted successfully" }, { status: 200 });
	}

	if (!userId) {
		return HttpResponse.json<MessageResponse>({ message: "Mock missing userId" }, { status: 400 });
	}

	if (userId === "no-history") {
		return HttpResponse.json<MessageResponse>({ message: "Mock no weather history to delete" }, { status: 404 });
	}

	if (userId === "error") {
		return HttpResponse.json<MessageResponse>({ message: "Mock server error while deleting weather history" }, { status: 500 });
	}
});
