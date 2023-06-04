import express from "express";
import mongoose from 'mongoose'
import router from "./Routes/user.routes";
import blogrouter from "./Routes/blog.routes";
//nodemon
//express
//mongoose
//npm install -g node-gyp
//npm install bcrypt
//bcryptjs

const app=express();//givess access to all express functionalities to app
app.use(express.json());//middleware to recognise the data sent is json
app.use("/api/user",router) //http://localhost:5000/api/user/
app.use("/api/blog/",blogrouter)
mongoose.connect('mongodb+srv://sanjaykumaranna799:oKYtng6fBuMrPstm@cluster0.u32ckiq.mongodb.net/BlogApp?retryWrites=true&w=majority'
).then(()=>app.listen(5000)).then(()=>console.log("Connected to database and localhost")).catch((err)=>console.log(err))

//username:sanjaykumaranna799
//password:oKYtng6fBuMrPstm