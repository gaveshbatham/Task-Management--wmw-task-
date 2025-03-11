import express from "express"
import multer from "multer";

import { login , logout , signup} from "../controller/auth.js"
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/login",login)
router.post("/logout",logout)
router.post("/signup",upload.single("profilePhoto"), signup)


export default router
