import request from "supertest";
import { server } from "../../../../server";

const path = "/api/weather/current/austin";

describe("Get current weather by city integration test happy path", async () => {
	test("first 5 requests with status code 200, last request with status code 429", async () => {
		const responses = await Promise.all([
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
			request(server).get(path),
		]);

		const statusCodes = responses.map(res => res.status);
		expect(statusCodes).toEqual([200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 429]);
	});
});

describe("Get current weather by city integration test sad path", async () => {
	test("should return 500 due to invalid api key", async () => {
		const apiKey = process.env.OPEN_WEATHER_API_KEY;
		delete process.env.OPEN_WEATHER_API_KEY;
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(path).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Missing weather api information"
		});

		process.env.OPEN_WEATHER_API_KEY = apiKey;
	});

	test("should return 404 when city is invalid", async () => {
		const path = "/api/weather/current/invalid";
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(path).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({
			message: "Mock invalid city"
		});
	});

	test("should return 500 on other generic errors", async () => {
		const path = "/api/weather/current/error";
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(path).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Mock generic error response"
		});
	});
});