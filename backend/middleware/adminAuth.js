
export function AdminAuth(req,res,next){
    const token = req.header("Authorization");
    const {email} = req.body;
    const {assignedTo} = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user details (email, role) to request object
        console.log(decoded);


        next();
      } catch (error) {
        res.status(403).json({ success: false, message: "Invalid token" });
      }

}



