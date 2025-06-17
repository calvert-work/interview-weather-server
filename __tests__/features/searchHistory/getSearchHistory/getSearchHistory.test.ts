import { pgInstance } from "../../../../src/db/pgInstance";
import { WEATHER_HISTORY_COLUMNS } from "../../../../src/constants/dbConstants";
import { Mock } from "vitest";
import { Request, Response } from "express";
import { getSearchHistory } from "../../../../src/controllers/searchHistory/getSearchHistory";

vi.mock("../../../../src/db/pgInstance", () => ({ pgInstance: vi.fn() }));

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

const mockedPgInstance = pgInstance as unknown as Mock;

describe("get search history unit tests happy path", () => {
	test("should return 200 with weather history", async () => {
		const mockHistory = [
			{
				[WEATHER_HISTORY_COLUMNS.ID]: "history-1",
				[WEATHER_HISTORY_COLUMNS.CITY_NAME]: "Austin",
				[WEATHER_HISTORY_COLUMNS.USER_ID]: "mock-user-id"
			}
		];

		mockedPgInstance.mockReturnValueOnce({
			select: vi.fn().mockReturnValueOnce({
				where: vi.fn().mockReturnValueOnce({
					orderBy: vi.fn().mockReturnValueOnce(mockHistory)
				})
			})
		});

		await getSearchHistory({ headers: { "user-id": "mock-user-id" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Search history retrieved successfully", data: mockHistory });
	});
});

describe("get search history unit tests sad path", () => {
	test("should return 404 if no history", async () => {
		mockedPgInstance.mockReturnValueOnce({
			select: vi.fn().mockReturnValueOnce({
				where: vi.fn().mockReturnValueOnce({
					orderBy: vi.fn().mockReturnValueOnce([])
				})
			})
		});

		await getSearchHistory({ headers: { "user-id": "mock-user-id" } } as unknown as Request, mockRes);
		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "No search history found" });
	});

	test("should return 500 if there is a DB error", async () => {
		mockedPgInstance.mockReturnValueOnce(vi.fn().mockRejectedValueOnce(new Error("DB error")));

		await getSearchHistory({ headers: { "user-id": "mock-user-id" } } as unknown as Request, mockRes);
		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while retrieving search history" });
	});
});
