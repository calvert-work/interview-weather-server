import { Request, Response } from "express";
import { pgInstance } from "../../../../src/db/pgInstance";
import { Mock } from "vitest";
import { getUser } from "../../../../src/controllers/user/getUser";
import { USERS_COLUMNS } from "../../../../src/constants/dbConstants";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

vi.mock("../../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const mockedPgInstance = pgInstance as unknown as Mock;

describe("get user controller unit test happy path", async () => {
	test("should return 200 when user is found", async () => {
		mockedPgInstance.mockReturnValueOnce({
			select: () => ({
				where: () => Promise.resolve([
					{
						[USERS_COLUMNS.ID]: "Mock user id",
						[USERS_COLUMNS.FIRST_NAME]: "first name",
						[USERS_COLUMNS.EMAIL]: "test@test.com"
					}
				])
			})
		});

		await getUser({ params: { email: "test@test.com" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "User found",
			data: {
				[USERS_COLUMNS.ID]: "Mock user id",
				[USERS_COLUMNS.FIRST_NAME]: "first name",
				[USERS_COLUMNS.EMAIL]: "test@test.com"
			}
		});
	});
});

describe("get user controller unit test sad path", async () => {
	test("should return 400 due to missing email", async () => {
		await getUser({ params: {} } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 400 due to bad email", async () => {
		await getUser({ params: { email: "test.com" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad user input" });
	});

	test("should return 404 if user is not found", async () => {
		mockedPgInstance.mockReturnValueOnce({
			select: () => ({
				where: () => Promise.resolve([])
			})
		});

		await getUser({ params: { email: "notfound@test.com" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
	});

	test("should return 500 when there is a db error", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: () => {
				throw new Error("error");
			}
		});

		await getUser({ params: { email: "test@test.com" } } as unknown as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while retrieving user" });
	});
});