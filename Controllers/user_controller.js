import user from "../model/user";
import bcrypt from 'bcrypt'
export const getAllUser= async(req,res,next)=>{
    let users;
    try{
        users= await user.find();
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json({users});
}
export const signup = async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    try{
      existingUser = await user.findOne({email});
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newuser= new user({
        name,email,password:hashedPassword,blogs:[]
    });
    
    try{
     await newuser.save()
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({
        newuser
    })
}
export const login = async (req,res,next)=>{
  const {email,password}=req.body;
  let existingUser;
  try{
    existingUser= await user.findOne({email});
  }catch(err){
    return console.log(err)
  }
  if(!existingUser){
    return res.status(404).json({message:"couldn't find user"})
  }

  const ispasswordcorrect=bcrypt.compareSync(password,existingUser.password)
if(ispasswordcorrect){
    return res.status(200).json({message:"logged in successfully"})
  }else{
    return res.status(400).json({message:"password mismatch"})
  }
  
}