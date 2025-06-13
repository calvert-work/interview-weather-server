import request from "supertest";
import { server } from "../../server";

describe("Get 5 days forecast by city test", async () => {
	const weatherPath = "/api/weather/current/austin";
	const forecastPath = "/api/weather/forecast/austin";

	test("first 5 requests with status code 200, last request with status code 429", async () => {
		const responses = await Promise.all([
			request(server).get(weatherPath),
			request(server).get(weatherPath),
			request(server).get(forecastPath),
			request(server).get(forecastPath),
			request(server).get(forecastPath),
			request(server).get(forecastPath),
		]);

		const statusCodes = responses.map(res => res.status);
		expect(statusCodes).toEqual([200, 200, 200, 200, 200, 429]);
	});

	test("should return 500 due to invalid api key", async () => {
		const apiKey = process.env.OPEN_WEATHER_API_KEY;
		delete process.env.OPEN_WEATHER_API_KEY;
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(forecastPath).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Invalid weather api key"
		});

		process.env.OPEN_WEATHER_API_KEY = apiKey;
	});

	test("should return 500 due to invalid weather api url", async () => {
		const apiKey = process.env.OPEN_WEATHER_URL;
		delete process.env.OPEN_WEATHER_URL;
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(forecastPath).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Invalid weather url"
		});

		process.env.OPEN_WEATHER_URL = apiKey;
	});

	test("should return 404 when city is invalid", async () => {
		const path = "/api/weather/forecast/invalid";
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(path).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({
			message: "Mock invalid city"
		});
	});

	test("should return 500 on other generic errors", async () => {
		const path = "/api/weather/forecast/error";
		server.set("trust proxy", true); // bypass rate limiter

		const response = await request(server).get(path).set("X-Forwarded-For", "1.2.3.4"); // set X-Forwarded-For to bypass rate limiter
		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Mock generic error response"
		});
	});
});