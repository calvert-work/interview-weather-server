import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { MessageWithDataResponse } from "../../../../src/dto/apiResponse/MessageWithDataResponse";
import { USERS_COLUMNS } from "../../../../src/constants/dbConstants";

/**
 * Get user endpoint mock response
 */
export const mockGetUser = http.get("*/api/weather/user/*", async ({ request }) => {
	const url = request.url.endsWith("/") ? request.url.slice(0, -1) : request.url;

	if (url.endsWith("test@test.com")) {
		return HttpResponse.json<MessageWithDataResponse>({
			message: "Mock user found",
			data: {
				[USERS_COLUMNS.ID]: "Mock user id",
				[USERS_COLUMNS.FIRST_NAME]: "Mock first name",
				[USERS_COLUMNS.EMAIL]: "Mock email"
			}
		}, { status: 200 });
	} else if (url.endsWith("notfound@test.com")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock user not found"
		}, { status: 404 });
	} else if (url.endsWith("test.com")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock bad user input"
		}, { status: 400 });
	} else if (url.endsWith("weather/user")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information"
		}, { status: 400 });
	} else if (url.endsWith("error")) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while retrieving user",
		}, { status: 500 });
	}
});
