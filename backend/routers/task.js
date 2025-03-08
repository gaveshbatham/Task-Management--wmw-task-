import express from 'express'
import {add_new_task , update_task ,delete_task ,get_task_by_email} from "../controller/task.js"
import multer from "multer";

const upload = multer();


const router=express.Router();

router.get('/one/:email',get_task_by_email )


router.post('/add',upload.none(), add_new_task)



router.put('/update/:_id', update_task )




router.delete('/delete/:_id',delete_task )





export default router;

