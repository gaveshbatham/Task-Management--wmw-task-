import express from "express";
import {
  add_user,
  get_one_user,
  get_all_users,
  update_user,
  delete_user,
} from "../controller/user.js";
import multer from "multer";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {onlyAdmin , user_or_admin} from "../middleware/usermid.js"

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/one/:email" ,authMiddleware,user_or_admin, get_one_user);

router.get("/get_all",authMiddleware,onlyAdmin, get_all_users);

router.post("/add", upload.single("profilePhoto"), add_user);

router.put("/update/",authMiddleware,user_or_admin,upload.single("profilePhoto"), update_user);

router.delete('/delete/:email',authMiddleware,user_or_admin,user_or_admin, delete_user)

export default router;
