import { server } from "../../../../server";
import request from "supertest";
import { FAVORITE_CITY_COLUMNS } from "../../../../src/constants/dbConstants";

vi.mock("../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const path = "/api/weather/favorites";

describe("get favorite cities integration test happy path", async () => {
	test("should return 200 when favorite cities are found", async () => {
		const response = await request(server).get(path).query({
			userId: "mock-user-id"
		});

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			message: "Mock favorite cities found",
			data: [
				{
					[FAVORITE_CITY_COLUMNS.ID]: "mock-city-id-1",
					[FAVORITE_CITY_COLUMNS.CITY_NAME]: "Austin",
					[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: "US",
					[FAVORITE_CITY_COLUMNS.USER_ID]: "mock-user-id"
				},
				{
					[FAVORITE_CITY_COLUMNS.ID]: "mock-city-id-2",
					[FAVORITE_CITY_COLUMNS.CITY_NAME]: "Dallas",
					[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: "US",
					[FAVORITE_CITY_COLUMNS.USER_ID]: "mock-user-id"
				}
			]
		});
	});
});

describe("get favorite cities integration test sad path", async () => {
	test("should return 404 when no favorite cities found", async () => {
		const response = await request(server).get(path).query({
			userId: "no-cities"
		});

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({
			message: "Mock favorite cities not found"
		});
	});

	test("should return 400 when userId is missing", async () => {
		const response = await request(server).get(path).query({});

		expect(response.status).toBe(400);
		expect(response.body).toStrictEqual({
			message: "Mock missing information"
		});
	});

	test("should return 500 on server/db error", async () => {
		const response = await request(server).get(path).query({
			userId: "error"
		});

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({
			message: "Mock server error while retrieving favorite cities"
		});
	});
});
