import rateLimit from "express-rate-limit";
import { oneMinuteInMs } from "../../constants/constants";

/**
 * Api call is limited to 5 requests max per min
 */
export const rateLimiter = rateLimit({
	windowMs: oneMinuteInMs,
	max: 5,
	message: "Too many requests. Please try again later."
});