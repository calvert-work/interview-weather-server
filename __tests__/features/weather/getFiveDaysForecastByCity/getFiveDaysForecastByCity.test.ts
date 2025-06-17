import { getFiveDaysForecastByCity } from "../../../../src/controllers/weather/getFiveDaysForecastByCity";
import axios from "axios";
import { Request, Response } from "express";
import { vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as unknown as {
	get: ReturnType<typeof vi.fn>;
};

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

describe("getFiveDaysForecastByCity unit test happy path", () => {
	test("should return 200 and forecast data when successful", async () => {
		const mockForecastData = {
			message: "Get forecast weather successfully",
			data: expect.any(Object)
		};

		mockedAxios.get = vi.fn().mockReturnValueOnce({ data: mockForecastData });

		const req = { params: { city: "London" } } as unknown as Request;

		await getFiveDaysForecastByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith(mockForecastData);
	});
});

describe("getFiveDaysForecastByCity unit test sad path", () => {
	test("should return 404 when city is invalid", async () => {
		mockedAxios.get.mockRejectedValueOnce({ status: 404 });

		const req = { params: { city: "InvalidCity" } } as unknown as Request;

		await getFiveDaysForecastByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid city" });
	});

	test("should return 500 on general error", async () => {
		mockedAxios.get = vi.fn().mockRejectedValueOnce(new Error("Something went wrong"));

		const req = { params: { city: "Houston" } } as unknown as Request;

		await getFiveDaysForecastByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Server error while getting current weather by city"
		});
	});
});
