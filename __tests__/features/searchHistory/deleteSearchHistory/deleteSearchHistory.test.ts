import { deleteSearchHistory } from "../../../../src/controllers/searchHistory/deleteSearchHistory";
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

describe("delete search history unit tests happy path", () => {
	test("should return 200 if history deleted", async () => {
		mockedPgInstance.mockReturnValueOnce({
			where: vi.fn().mockReturnThis(),
			del: vi.fn().mockReturnValueOnce(2)
		});

		await deleteSearchHistory({ headers: { userId: "mock-user-id" } } as unknown as Request, mockRes);
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Weather history deleted successfully" });
	});
});

describe("delete search history unit tests sad path", () => {
	test("should return 404 if no history to delete", async () => {
		mockedPgInstance.mockReturnValueOnce({
			where: vi.fn().mockReturnThis(),
			del: vi.fn().mockReturnValueOnce(0)
		});

		await deleteSearchHistory({ headers: { userId: "mock-user-id" } } as unknown as Request, mockRes);
		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "No weather history found to delete" });
	});



	test("should return 500 on server error", async () => {
		mockedPgInstance.mockReturnValueOnce(() => {
			throw new Error("DB error");
		});

		await deleteSearchHistory({ headers: { userId: "mock-user-id" } } as unknown as Request, mockRes);
		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while deleting weather history" });
	});
});
