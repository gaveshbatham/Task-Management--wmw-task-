import express from 'express'
import {add_new_task , update_task ,delete_task ,get_task_by_email} from "../controller/task.js"
import multer from "multer";

import {user_or_admin , assignedTo_check ,findBy_id}  from "../middleware/taskmid.js"


const upload = multer();


const router=express.Router();

router.get('/one/:email',user_or_admin,get_task_by_email )


router.post('/add',assignedTo_check,upload.none(), add_new_task)



router.put('/update/:_id',assignedTo_check, update_task )




router.delete('/delete/:_id',findBy_id,delete_task )





export default router;

