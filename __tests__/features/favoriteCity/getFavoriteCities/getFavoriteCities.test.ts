import { Request, Response } from "express";
import { pgInstance } from "../../../../src/db/pgInstance";
import { Mock } from "vitest";
import { getFavoriteCities } from "../../../../src/controllers/favoriteCity/getFavoriteCities";
import { FAVORITE_CITY_COLUMNS } from "../../../../src/constants/dbConstants";

const mockRes = {} as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

vi.mock("../../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const mockedPgInstance = pgInstance as unknown as Mock;

describe("get favorite cities unit test happy path", async () => {
	test("should return 200 when favorite cities are found", async () => {
		const mockCities = [
			{
				[FAVORITE_CITY_COLUMNS.ID]: "mock-city-id-1",
				[FAVORITE_CITY_COLUMNS.CITY_NAME]: "Austin",
				[FAVORITE_CITY_COLUMNS.COUNTRY_CODE]: "US",
				[FAVORITE_CITY_COLUMNS.USER_ID]: "mock-user-id"
			}
		];

		mockedPgInstance.mockReturnValueOnce({
			select: vi.fn().mockReturnValueOnce({
				where: vi.fn().mockReturnValueOnce(mockCities)
			})
		});

		await getFavoriteCities({ query: { userId: "mock-user-id" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Favorite cities found",
			data: mockCities
		});
	});
});

describe("get favorite cities unit test sad path", async () => {
	test("should return 400 due to missing userId", async () => {
		await getFavoriteCities({ query: {} } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 404 when favorite cities are not found", async () => {
		mockedPgInstance.mockReturnValueOnce({
			select: vi.fn().mockReturnValueOnce({
				where: vi.fn().mockReturnValueOnce([])
			})
		});

		await getFavoriteCities({ query: { userId: "mock-user-id" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Favorite cities not found" });
	});

	test("should return 500 when there is a db error", async () => {
		mockedPgInstance.mockReturnValueOnce({
			select: vi.fn().mockReturnValueOnce({
				where: () => {
					throw new Error("mock db error");
				}
			})
		});

		await getFavoriteCities({ query: { userId: "mock-user-id" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while retrieving favorite cities" });
	});
});
