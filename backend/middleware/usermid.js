import jwt from "jsonwebtoken";

function onlyAdmin(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[0]; // Extract token
    console.log(token)

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        console.log(decoded);

        if (decoded.role === "admin") {
            return next(); // Proceed to next middleware or route
        } else {
            return res.status(403).json({ success: false, message: "Only admin users can access this" });
        }
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}

function user_or_admin(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[0]; // Extract token
    const { email } = req.params; // Get email from request params

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        console.log(decoded);

        if (decoded.role === "admin" || decoded.email === email) {
            return next(); // Proceed if the user is an admin or the owner of the account
        } else {
            return res.status(403).json({ success: false, message: "Access denied. Only admins or the account owner can access this" });
        }
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}

export { onlyAdmin, user_or_admin };
