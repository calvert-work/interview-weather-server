import { describe, test, expect, vitest } from "vitest";
import { server } from "../server";
import { startServer } from "../startServer";

describe("Express Server test", () => {
	test("exit when port is undefined", () => {
		const originalPort = process.env.SERVER_PORT;
		delete process.env.SERVER_PORT;

		const exitSpy = vitest.spyOn(process, "exit").mockImplementation(() => {
			throw new Error("process.exit called");
		});

		expect(() => startServer(server)).toThrow("process.exit called");
		expect(exitSpy).toHaveBeenCalledWith(1);

		process.env.SERVER_PORT = originalPort;
		exitSpy.mockRestore();
	});
});