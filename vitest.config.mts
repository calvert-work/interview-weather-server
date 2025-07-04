import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		setupFiles: "./__tests__/vitestSetupFile.ts",
		coverage: {
			provider: "istanbul",
			reporter: ["html"],
			exclude: ["build", "__tests__"]
		}
	}
})