import { beforeAll, afterEach, afterAll } from "vitest";
import { mockServer } from "./mockServer/node";

beforeAll(() => mockServer.listen());

afterEach(() => {
	mockServer.resetHandlers();
	vi.clearAllMocks();
	vi.resetAllMocks();
});

afterAll(() => mockServer.close());