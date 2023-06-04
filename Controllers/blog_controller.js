import mongoose from "mongoose";
import blog from "../model/blog";
import user from "../model/user";

export const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
        blogs=await blog.find();
    }catch(err){
       return  console.log(err);
    }
    if(!blogs){
        return res.status(400).json({message:"not found"})
    }
    return res.status(200).json({message:"Blogs found",data:blogs})
}
  export const addblog = async (req,res,next)=>{
    const { title,description,image,users}=req.body;
    let existingUser;
    try{
      existingUser= await user.findById(users);
    }catch(err){
        return console.log(err)
    }
    const blogg = new blog({
        title,description,image,users
    });

    try{
        const session  = await mongoose.startSession();
        session.startTransaction();
        await blogg.save({session});
        existingUser.blogs.push(blogg);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        return console.log(err);
    }
    return res.status(200).json({blogg});
  }

  export const updateblog= async (req,res,next)=>{
    const {title,description} = req.body;
    const blogId=req.params.id;
    let blogg;
    try{
      blogg = await blog.findByIdAndUpdate(blogId,{
        title,description
     })} catch(err){
        return console.log(err);
     }
     if(!blog){
        return res.status(500).json({message:"Unable to update"})
     }else{
        return res.status(200).json({message:"updated successfully ",data:blogg})
     }

  }

export const getbyid= async (req,res,next)=>{
    const id =req.params.id;
    let blogg;
    try{
    blogg = await blog.findById(id);
    }catch(err){
       return console.log(err);
    }

    if(!blogg){
        return res.status(500).json({message:"not found"})
    }else{
        return res.status(200).json({message:"Success",data:blogg})
    }
}

export const deleteblog= async (req,res,next)=>{
    const id =req.params.id;
    let blogg;
    try{
    blogg = await blog.findByIdAndDelete(id).populate('User');
    await blogg.users.blogs.pull(blogg);
    await blogg.users.save();
    }catch(err){
       return console.log(err);
    }

    if(!blogg){
        return res.status(500).json({message:"not found"})
    }else{
        return res.status(200).json({message:"Success data is deleted"})
    }
}