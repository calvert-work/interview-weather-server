import express, { Express } from "express";
import request from "supertest";
import { rateLimiter } from "../../../src/middlewares/limiters/rateLimiter";

describe("rateLimiter middleware unit test", () => {
	let app: Express;

	beforeEach(() => {
		app = express();
		app.use(rateLimiter);
		app.get("/", (req, res) => {
			res.status(200).send("OK");
		});
	});

	test("should allow up to 5 requests", async () => {
		for (let i = 0; i < 5; i += 1) {
			const response = await request(app).get("/");
			expect(response.status).toBe(200);
			expect(response.text).toBe("OK");
		}
	});

	test("should block the 6th request with 429 status", async () => {
		for (let i = 0; i < 5; i += 1) {
			await request(app).get("/");
		}

		const response = await request(app).get("/");
		expect(response.status).toBe(429);
		expect(response.text).toBe("Too many requests. Please try again later.");
	});
});
