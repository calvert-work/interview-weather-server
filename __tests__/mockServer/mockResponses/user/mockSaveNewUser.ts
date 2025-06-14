import { http, HttpResponse } from "msw";
import { MessageResponse } from "../../../../src/dto/apiResponse/MessageResponse";
import { SaveNewUserDto } from "../../../../src/dto/user/SaveNewUserDto";

/**
 * Get user endpoint mock response
 */
export const mockSaveNewUser = http.post("*/api/weather/user", async ({ request }) => {
	const { firstName, email } = await request.json() as SaveNewUserDto;

	if (!firstName || !email) {
		return HttpResponse.json<MessageResponse>({
			message: "Mock missing information",
		}, { status: 400 });
	}

	if (firstName === "first name" && email === "test@test.com") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock user saved successfully",
		}, { status: 201 });
	} else if (firstName === "first name" && email === "test.com") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock bad user input",
		}, { status: 400 });
	} else if (firstName === "first name" && email === "exist@test.com") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock user already exist",
		}, { status: 409 });
	} else if (firstName === "first name" && email === "error") {
		return HttpResponse.json<MessageResponse>({
			message: "Mock server error while saving new user",
		}, { status: 500 });
	}
});
