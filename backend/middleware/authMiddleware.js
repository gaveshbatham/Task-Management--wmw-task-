import jwt from "jsonwebtoken";


export function authMiddleware(req, res, next) {
  const token = req.cookies.Authorization;
  console.log(req.headers)

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    // Attach user details (email, role) to request object
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
}
