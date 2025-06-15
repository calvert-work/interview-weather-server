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
		process.env.OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5";
	});

	test("should call next() when api key and url are present", () => {
		openWeatherApiDetailsCheck({} as Request, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});

	test("should return 500 when api key is missing", () => {
		delete process.env.OPEN_WEATHER_API_KEY;

		openWeatherApiDetailsCheck({} as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing weather api information" });
		expect(mockNext).not.toHaveBeenCalled();
	});

	test("should return 500 when api url is missing", () => {
		delete process.env.OPEN_WEATHER_URL;

		openWeatherApiDetailsCheck({} as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing weather api information" });
		expect(mockNext).not.toHaveBeenCalled();
	});
});
