import { getCurrentWeatherByCity } from "../../../../src/controllers/weather/getCurrentWeatherByCity";
import { Request, Response } from "express";
import { pgInstance } from "../../../../src/db/pgInstance";
import axios from "axios";
import { WEATHER_HISTORY_COLUMNS } from "../../../../src/constants/dbConstants";
import { Mock } from "vitest";

vi.mock("axios");
vi.mock("../../../../src/db/pgInstance", () => ({
	pgInstance: vi.fn()
}));

const mockedAxios = axios as unknown as { get: Mock };
const mockedPgInstance = pgInstance as unknown as Mock;

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

describe("get current weather by city unit test happy path", () => {
	test("should return 200 and store history when userId is present", async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: {
				name: "Austin",
				sys: { country: "US" },
				weather: [{ description: "sunny" }]
			}
		});

		mockedPgInstance.mockReturnValueOnce({
			insert: vi.fn().mockReturnValueOnce({
				onConflict: vi.fn().mockReturnValueOnce({
					ignore: vi.fn().mockReturnValueOnce({
						returning: vi.fn().mockReturnValueOnce([{ [WEATHER_HISTORY_COLUMNS.ID]: "mock-history-id" }])
					})
				})
			})
		});

		const req = {
			params: { city: "Austin" },
			headers: { "user-id": "mock-user-id" }
		} as unknown as Request;

		await getCurrentWeatherByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Get weather successfully",
			data: expect.any(Object),
			historyStored: true
		});
	});

	test("should return 200 and not store history when userId is missing", async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: { name: "Austin", sys: { country: "US" } }
		});

		const req = { params: { city: "Austin" }, headers: {} } as unknown as Request;

		await getCurrentWeatherByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Get weather successfully",
			data: expect.any(Object),
			historyStored: false
		});
	});
});

describe("get current weather by city unit test sad path", async () => {
	test("should return 404 on invalid city", async () => {
		mockedAxios.get.mockRejectedValueOnce({ status: 404 });

		const req = { params: { city: "InvalidCity" }, headers: {} } as unknown as Request;

		await getCurrentWeatherByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid city" });
	});

	test("should return 500 on unknown error", async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error("Unknown"));

		const req = { params: { city: "Houston" }, headers: {} } as unknown as Request;

		await getCurrentWeatherByCity(req, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Server error while getting current weather by city"
		});
	});
});