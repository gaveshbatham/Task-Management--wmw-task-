import jwt from "jsonwebtoken";


export function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user details (email, role) to request object
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
}
