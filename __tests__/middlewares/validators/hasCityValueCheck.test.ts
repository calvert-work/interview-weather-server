import { Request, Response, NextFunction } from "express";
import { vi } from "vitest";
import { hasCityValueCheck } from "../../../src/middlewares/validators/hasCityValueCheck";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

const mockNext = vi.fn() as NextFunction;

describe("hasCityValueCheck middleware unit test", () => {
	test("should call next() when city param is present", () => {
		hasCityValueCheck({ params: { city: "London" } } as unknown as Request, mockRes as Response, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});

	test("should return 400 when city param is missing", () => {
		hasCityValueCheck({ params: {} } as unknown as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing information" });
		expect(mockNext).not.toHaveBeenCalled();
	});
});
