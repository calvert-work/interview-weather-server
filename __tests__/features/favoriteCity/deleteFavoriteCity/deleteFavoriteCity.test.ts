import { Request, Response } from "express";
import { deleteFavoriteCity } from "../../../../src/controllers/favoriteCity/deleteFavoriteCity";
import { pgInstance } from "../../../../src/db/pgInstance";
import { Mock } from "vitest";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

vi.mock("../../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const mockedPgInstance = pgInstance as unknown as Mock;

describe("delete favorite city unit test happy path", async () => {
	test("should return 200 when city deleted", async () => {
		mockedPgInstance.mockReturnValueOnce({
			where: vi.fn().mockReturnValueOnce({
				del: vi.fn().mockReturnValueOnce(1)
			})
		});

		await deleteFavoriteCity({
			params: { id: "mock-fav-city-id" }
		} as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Favorite city deleted successfully" });
	});
});

describe("delete favorite city unit test sad path", async () => {
	test("should return 400 for missing id", async () => {
		await deleteFavoriteCity({ params: {} } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});
	
	test("should return 404 if city not found", async () => {
		mockedPgInstance.mockReturnValueOnce({
			where: vi.fn().mockReturnValueOnce({
				del: vi.fn().mockReturnValueOnce(0)
			})
		});

		await deleteFavoriteCity({
			params: { id: "non-existent-id" }
		} as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Favorite city not found" });
	});


	test("should return 500 for db error", async () => {
		mockedPgInstance.mockReturnValueOnce({
			where: () => ({
				del: () => {
					throw new Error("DB error");
				}
			})
		});

		await deleteFavoriteCity({
			params: { id: "mock-fav-city-id" }
		} as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while deleting favorite city" });
	});
});
