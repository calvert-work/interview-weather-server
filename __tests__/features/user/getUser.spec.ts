import { server } from "../../../server";
import request from "supertest";

vi.mock("../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const path = "/api/weather/user";

describe("get user intergration test happy path", async () => {

	test("should return 200 when user is found", async () => {
		const response = await request(server).get(`${path}/test@test.com`);

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			message: "Mock user found",
			data: {
				first_name: "Mock first name",
				email: "Mock email"
			}
		});
	});
});

describe("get user intergration test sad path", async () => {
	test("should return 404 when user is not found", async () => {
		const response = await request(server).get(`${path}/notfound@test.com`);

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({
			message: "Mock user not found",
		});
	});

	test("should return 400 when email is missing", async () => {
		const response = await request(server).get(`${path}/`);
		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock missing information",
		});
	});

	test("should return 400 when email is bad", async () => {
		const response = await request(server).get(`${path}/test.com`);

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock bad user input",
		});
	});

	test("should return 500 when there is a server or db error", async () => {
		const response = await request(server).get(`${path}/error`);

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Mock server error while retrieving user",
		});
	});
});