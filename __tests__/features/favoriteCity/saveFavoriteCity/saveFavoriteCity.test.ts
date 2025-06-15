import { saveFavoriteCity } from "../../../../src/controllers/favoriteCity/saveFavoriteCity";
import { Request, Response } from "express";
import { pgInstance } from "../../../../src/db/pgInstance";
import { Mock } from "vitest";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

vi.mock("../../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const mockedPgInstance = pgInstance as unknown as Mock;

describe("save favorite city unit test happy path", async () => {
	test("favorite city saved successfully", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: vi.fn().mockReturnValueOnce({
				onConflict: vi.fn().mockReturnValueOnce({
					ignore: vi.fn().mockReturnValueOnce({
						returning: vi.fn().mockReturnValueOnce([{ id: 1 }]) // successful insert will return the id of the inserted row
					})
				})
			})
		});

		await saveFavoriteCity(
			{
				body: {
					city: "austin",
					countryCode: "US"
				},
				headers: {
					userId: "mock-user-id"
				}
			} as unknown as Request,
			mockRes
		);

		expect(mockRes.status).toHaveBeenCalledWith(201);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Favorite city added successfully" });
	});
});

describe("save favorite city unit test sad path", async () => {
	test("should return 409 when city already exists", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: vi.fn().mockReturnValueOnce({
				onConflict: vi.fn().mockReturnValueOnce({
					ignore: vi.fn().mockReturnValueOnce({
						returning: vi.fn().mockReturnValueOnce([]) // successful insert will return the id of the inserted row
					})
				})
			})// when favorite city already exist for the user, empty id will be returned
		});

		await saveFavoriteCity(
			{
				body: {
					city: "austin",
					countryCode: "US",
				},
				headers: {
					userId: "mock-user-id"
				}
			} as unknown as Request,
			mockRes
		);

		expect(mockRes.status).toHaveBeenCalledWith(409);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Favorite city already exist" });
	});

	test("should return 400 when city is missing", async () => {
		await saveFavoriteCity(
			{
				body: {
					// city missing
					countryCode: "US",
				},
				headers: {
					userId: "mock-user-id"
				}
			} as unknown as Request,
			mockRes
		);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 400 when country code is missing", async () => {
		await saveFavoriteCity(
			{
				body: {
					city: "austin",
					// countryCode missing
				},
				headers: {
					userId: "mock-user-id"
				}
			} as unknown as Request,
			mockRes
		);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 500 when an exception occurs", async () => {
		mockedPgInstance.mockImplementationOnce(() => {
			throw new Error("mock DB error");
		});

		await saveFavoriteCity(
			{
				body: {
					city: "austin",
					countryCode: "US"
				},
				headers: {
					userId: "mock-user-id"
				}
			} as unknown as Request,
			mockRes
		);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while saving favorite city" });
	});
});