import { http, HttpResponse } from "msw";

/**
 * Healthcheck endpoint mock response
 */
export const mockHealthcheck = http.get("*/healthcheck", () => {
	return HttpResponse.json({
		name: "Weather app server",
		env: "test",
		status: "OK",
	});
});
