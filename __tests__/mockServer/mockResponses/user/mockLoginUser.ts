import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { MessageWithDataResponse } from "../../../../src/dto/apiResponse/MessageWithDataResponse";
import { USERS_COLUMNS } from "../../../../src/constants/dbConstants";
import { LoginUserRequestDto } from "../../../../src/dto/user/LoginUserRequestDto";

/**
 * Get user endpoint mock response
 */
export const mockLoginUser = http.post("*/api/weather/login", async ({ request }) => {
	const { email } = await request.json() as LoginUserRequestDto;

	if (email === "test@test.com") {
		return HttpResponse.json<MessageWithDataResponse>({
			message: "Mock user found",
			data: {
				[USERS_COLUMNS.ID]: "Mock user id",
				[USERS_COLUMNS.FIRST_NAME]: "Mock first name",
				[USERS_COLUMNS.EMAIL]: "Mock email"
			}
		}, { status: 200 });
	} else if (email === "notfound@test.com") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock user not found"
		}, { status: 404 });
	} else if (email === "test.com") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock bad user input"
		}, { status: 400 });
	} else if (!email) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information"
		}, { status: 400 });
	} else if (email === "error") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while retrieving user",
		}, { status: 500 });
	}
});
