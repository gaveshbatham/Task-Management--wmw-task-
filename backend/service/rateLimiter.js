import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 40, 
    message: { success: false, message: "Request limit exceeded" },
    statusCode: 429,
    standardHeaders: true, 
    legacyHeaders: false, 
    keyGenerator: (req) => req.ip , 
});

export { limiter };




// standardHeaders: 'draft-8' (Rate-Limit Headers)
// Defines how rate-limiting headers should be sent.
// draft-8 (RFC standard headers) sends headers like:
// RateLimit-Limit: Maximum requests allowed.
// RateLimit-Remaining: Requests left before hitting the limit.
// RateLimit-Reset: Time until the counter resets