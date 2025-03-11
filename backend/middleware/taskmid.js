import jwt from "jsonwebtoken"
import Task from "../model/task.js"

function assignedTo_check(req,res,next){
    const token=req.cookies.Authorization;
    const {assignedTo} = req.body 

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        console.log(decoded);

        if (decoded.role === "admin" || decoded.email === assignedTo) {
            return next(); // Proceed if the user is an admin or the owner of the account
        } else {
            return res.status(403).json({ success: false, message: "Access denied. Only admins or the account owner can access this" });
        }


    }catch(err){
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}


function user_or_admin(req, res, next) {
    const token = req.cookies.Authorization; // Extract token
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


async function findBy_id(req,res,next){
    const token = req.cookies.Authorization; // Extract token
    const { _id } = req.params;

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);

        if(decoded.role==="admin"){
            return next();
        }

        const task=await Task.findById({_id})

        if(task.assignedTo === decoded.email){
            return next();
        }else{
            return res.status(403).json({ success: false, message: "Access denied. Only admins or the account owner can access or perform this" });
        }


    }catch (error) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }

}


export { assignedTo_check , user_or_admin  , findBy_id};
