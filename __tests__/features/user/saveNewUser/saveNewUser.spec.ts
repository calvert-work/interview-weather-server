import { server } from "../../../../server";
import request from "supertest";

vi.mock("../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const path = "/api/weather/register";

describe("save new user intergration test happy path", async () => {
	test("should return 201 when user is saved successfully", async () => {
		const response = await request(server).post(path).send({
			firstName: "first name",
			email: "test@test.com"
		});

		expect(response.status).toBe(201);
		expect(response.body).toStrictEqual({
			message: "Mock user saved successfully",
		});
	});
});

describe("save new user intergration test sad path", async () => {
	test("should return 400 when first name is missing", async () => {
		const response = await request(server).post(path).send({
			email: "test@test.com"
		});

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock missing information",
		});
	});

	test("should return 400 when email is missing", async () => {
		const response = await request(server).post(path).send({
			firstName: "first name"
		});

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock missing information",
		});
	});

	test("should return 400 when email is bad", async () => {
		const response = await request(server).post(path).send({
			firstName: "first name",
			email: "test.com"
		});

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock bad user input",
		});
	});

	test("should return 409 when email is already exist", async () => {
		const response = await request(server).post(path).send({
			firstName: "first name",
			email: "exist@test.com"
		});

		expect(response.status).toBe(409);
		expect(response.body).toStrictEqual({
			message: "Mock user already exist",
		});
	});

	test("should return 500 when there is a server or db error", async () => {
		const response = await request(server).post(path).send({
			firstName: "first name",
			email: "error"
		});

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Mock server error while saving new user",
		});
	});
});