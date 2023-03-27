
const express = require("express");
const UserModel = require("../models/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body
   
    

    const userAlready =await UserModel.findOne({email})
   
    try{
        // If the user is already present, then there should be a response that "User already exist, please login", that means there should be no two users registered with same details.
        if(userAlready){
            res.status(200).send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password,4,async(err, hash)=> {
                const user = await UserModel({name,email,gender,password:hash,age,city,is_married});
                await user.save()
                res.status(200).send({
                 "msg":"Registration done Successfully"
                })
             });
        }

    }
    catch(err){
        res.status(400).send({
            "msg":"error while registering the user"
           })
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
   const user= await UserModel.findOne({email});
   console.log(user)
    try{
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
              if(result){
                res.status(200).send({"mag":"Login Successfull","token":jwt.sign({
                   "userId":user._id
                  }, 'ankesh', { expiresIn: '1d' })})
              }else{
                res.status(400).send({"mag":"Wrong Credentials"})
              }
            });
        }

    }
    catch(err){
        res.status(400).send({
            "msg":"error while login the user"
           })
    }
});

module.exports=userRouter