import { Request, Response, NextFunction } from "express";
import { vi } from "vitest";
import { headerHasUserIdCheck } from "../../../src/middlewares/validators/headerHasUserIdCheck";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

const mockNext = vi.fn() as NextFunction;

describe("headerHasUserIdCheck middleware unit test", () => {
	test("should call next() when user-id header is present", () => {
		headerHasUserIdCheck({ headers: { "user-id": "mock-user-id" } } as unknown as Request, mockRes as Response, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});

	test("should return 400 when user-id header is missing", () => {
		headerHasUserIdCheck({ headers: {} } as unknown as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing header information" });
		expect(mockNext).not.toHaveBeenCalled();
	});
});
