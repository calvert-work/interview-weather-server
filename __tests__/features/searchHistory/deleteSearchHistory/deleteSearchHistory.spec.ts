import request from "supertest";
import { server } from "../../../../server";

const path = "/api/weather/history";

describe("delete search history integration tests happy path", () => {

	test("should return 200 when history is deleted", async () => {
		const response = await request(server).delete(path).set("user-id", "mock-user-id");

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ message: "Mock weather history deleted successfully" });
	});

});

describe("delete search history integration tests sad path", () => {
	test("should return 400 on missing userId", async () => {
		const response = await request(server).delete(path);

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({ message: "Mock missing userId" });
	});

	test("should return 404 if no history found", async () => {
		const response = await request(server).delete(path).set("user-id", "no-history");

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({ message: "Mock no weather history to delete" });
	});


	test("should return 500 on server error", async () => {
		const response = await request(server).delete(path).set("user-id", "error");

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({ message: "Mock server error while deleting weather history" });
	});
});
