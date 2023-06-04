import express from "express";
import { addblog, deleteblog, getAllBlogs, getbyid, updateblog } from "../Controllers/blog_controller";
 
const blogrouter = express.Router();


blogrouter.get("/",getAllBlogs);
blogrouter.post("/add",addblog);
blogrouter.put("/update/:id",updateblog);
blogrouter.get("/:id",getbyid);
blogrouter.delete("/delete/:id",deleteblog);
export default blogrouter;