import request from "supertest";
import { server } from "../../../../server";

const path = "/api/weather/history";

describe("get search history integration tests happy path", () => {
	test("should return 200 with history", async () => {
		const res = await request(server).get(path).set("user-id", "mock-user-id");

		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Mock weather history found");
		expect(Array.isArray(res.body.data)).toBe(true);
	});
});

describe("get search history integration tests sad path", () => {
	test("should return 404 if no history", async () => {
		const res = await request(server).get(path).set("user-id", "notfound");
		
		expect(res.status).toBe(404);
		expect(res.body).toEqual({ message: "Mock weather history not found" });
	});

	test("should return 400 if userId is missing", async () => {
		const res = await request(server).get(path);

		expect(res.status).toBe(400);
		expect(res.body).toEqual({ message: "Mock missing information" });
	});

	test("should return 500 on server error", async () => {
		const res = await request(server).get(path).set("user-id", "error");

		expect(res.status).toBe(500);
		expect(res.body).toEqual({ message: "Mock server error while retrieving weather history" });
	});
});
