import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";

import userRoute from './routers/user.js'
import taskRoute from './routers/task.js'

import { login  } from './controller/login.js'
import {verify_email} from "./controller/verify.js"

import { authMiddleware } from "./middleware/authMiddleware.js";

import cors from 'cors'


dotenv.config();
connectDB();
const app= express();
const PORT= process.env.PORT || 5000

app.use(cookieParser()); 

const corsOptions = {
    origin: [process.env.FRONTEND_LINK],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  };
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    res.send("<h1> this is from backend  </h1>") 
})


app.post("/login" , login )
app.get("/verify/:token" , verify_email)

app.use('/user', userRoute)
app.use('/task' ,authMiddleware, taskRoute)
// app.use('/user' , userRoute)
// app.use('/task' , taskRoute)


app.listen(PORT, ()=>{
    console.log(`server is runing on ${PORT}`)
} )