import { healthcheck } from "../../../src/controllers/healthcheck";
import { Request, Response } from "express";

const mockRes = {} as unknown as Response;
mockRes.json = vi.fn();
mockRes.status = vi.fn(() => mockRes);

describe("healthcheck unit test", () => {
	test("should return 200 and expected healthcheck payload", () => {
		healthcheck({} as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			name: "Weather app server",
			env: "test",
			status: "OK"
		});
	});
});
