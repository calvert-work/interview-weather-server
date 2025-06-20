import { saveNewUser } from "../../../../src/controllers/user/saveNewUser";
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

describe("save new user controller unit test happy path", async () => {
	test("should return 201 after saving new user", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: () => ({
				onConflict: () => ({
					ignore: () => ({
						returning: () => Promise.resolve([{ id: 1 }]) // successful insert will return the id of the inserted row
					})
				})
			})
		});

		await saveNewUser({ body: { firstName: "first name", email: "test@test.com" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(201);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "User saved successfully", data: { userId: 1 } });
	});
});

describe("save new user controller unit test sad path", async () => {
	test("should return 400 due to missing firstName", async () => {
		await saveNewUser({ body: { email: "test@test.com" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 400 due to missing email", async () => {
		await saveNewUser({ body: { firstName: "first name" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
	});

	test("should return 400 due to bad email", async () => {
		await saveNewUser({ body: { firstName: "first name", email: "test.com" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad user input" });
	});

	test("should return 409 when there is an existing user", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: () => ({
				onConflict: () => ({
					ignore: () => ({
						returning: () => Promise.resolve([]) // knex will return an empty array when insert is ignored
					})
				})
			})
		});

		await saveNewUser({ body: { firstName: "first name", email: "test@test.com" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(409);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "User already exist" });
	});

	test("should return 500 when there is a db error", async () => {
		mockedPgInstance.mockReturnValueOnce({
			insert: () => {
				throw new Error("error");
			}
		});

		await saveNewUser({ body: { firstName: "first name", email: "test@test.com" } } as Request, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error while saving new user" });
	});
});