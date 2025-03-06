import express from "express";
import {
  add_user,
  get_one_user,
  get_all_users,
  update_user,
  delete_user,
} from "../controller/user.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/one/:email", get_one_user);

router.get("/get_all", get_all_users);

router.post("/add", upload.single("profilePhoto"), add_user);

router.put("/update/:email",upload.single("profilePhoto"), update_user);

router.delete('/delete/:email', delete_user)

export default router;
