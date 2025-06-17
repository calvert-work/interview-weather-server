import request from "supertest";
import { server } from "../../../../server";

const path = "/api/weather/favorites";

describe("delete favorite city integration test happy path", async () => {
	test("should return 200 when city deleted", async () => {
		const response = await request(server).delete(`${path}/mock-fav-city-id`);

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ message: "Mock favorite city deleted successfully" });
	});
});

describe("delete favorite city integration test sad path", async () => {
	test("should return 404 if city not found", async () => {
		const response = await request(server).delete(`${path}/non-existent-id`);

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({ message: "Mock favorite city not found" });
	});

	test("should return 400 for missing id", async () => {
		const response = await request(server).delete(`${path}`);
		
		expect(response.status).toBe(400); 
	});

	test("should return 500 for server error", async () => {
		const response = await request(server).delete(`${path}/error`);

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({ message: "Mock server error while deleting favorite city" });
	});
});
