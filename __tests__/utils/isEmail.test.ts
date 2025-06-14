import { isEmail } from "../../src/utils/isEmail";

describe("isEmail test happy path", async () => {
	test("returns true for valid email", () => {
		expect(isEmail("test@example.com")).toBe(true);
	});
});

describe("isEmail test sad path", async () => {
	test("returns false for invalid email", () => {
		expect(isEmail("")).toBe(false);
		expect(isEmail("plainaddress")).toBe(false);
		expect(isEmail("missingatsign.com")).toBe(false);
		expect(isEmail("missingdomain@.com")).toBe(false);
		expect(isEmail("missingdot@domaincom")).toBe(false);
		expect(isEmail("space in@email.com")).toBe(false);
		expect(isEmail("@no-local-part.com")).toBe(false);
	});
});