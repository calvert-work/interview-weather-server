import { server } from "../../../../server";
import request from "supertest";

vi.mock("../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const path = "/api/weather/favorites";

describe("save favorite city intergration test happy path", async () => {
	test("should return 201 when favorite city is saved", async () => {
		const response = await request(server).post(path).send({
			city: "Austin",
			countryCode: "US",
			userId: "mock user id"
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: "Mock favorite city added successfully"
		});
	});
});

describe("get user intergration test sad path", async () => {
	test("should return 409 when favorite city already exists", async () => {
		const response = await request(server).post(path).send({
			city: "Austin",
			countryCode: "US",
			userId: "already-exist"
		});

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			message: "Mock favorite city already exist"
		});
	});

	test("should return 400 when required fields are missing", async () => {
		const response = await request(server).post(path).send({
			countryCode: "US",
			userId: "mock user id"
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			message: "Mock missing information"
		});
	});

	test("should return 500 when invalid user ID triggers FK error", async () => {
		const response = await request(server).post(path).send({
			city: "Houston",
			countryCode: "US",
			userId: "non-existent-id"
		});

		expect(response.status).toBe(500);
		expect(response.body).toEqual({
			message: "Mock server error while saving favorite city"
		});
	});
});