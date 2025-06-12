import { describe, expect, test } from "vitest";
import request from "supertest";
import { server } from "../../server";

describe("healthcheck test", async () => {
	test("should return healthcheck object", async () => {
		const response = await request(server).get("/healthcheck");

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			name: "Weather app server",
			env: "development",
			status: "OK",
		});
	});
});