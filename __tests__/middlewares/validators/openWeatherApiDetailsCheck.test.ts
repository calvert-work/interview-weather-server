import { Request, Response, NextFunction } from "express";
import { vi } from "vitest";
import { openWeatherApiDetailsCheck } from "../../../src/middlewares/validators/openWeatherApiDetailsCheck";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

const mockNext = vi.fn() as NextFunction;

describe("openWeatherApiDetailsCheck middleware unit test", () => {
	beforeEach(() => {
		// Reset env vars before each test
		process.env.OPEN_WEATHER_API_KEY = "mock-api-key";
	});

	test("should call next() when api key and url are present", () => {
		openWeatherApiDetailsCheck({} as Request, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});
});
