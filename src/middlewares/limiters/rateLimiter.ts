import rateLimit from "express-rate-limit";
import { thirtySecondsInMs } from "../../constants/constants";

/**
 * Api call is limited to 10 requests max per 30 secs
 */
export const rateLimiter = rateLimit({
	windowMs: thirtySecondsInMs,
	max: 10,
	message: "Too many requests. Please try again later."
});