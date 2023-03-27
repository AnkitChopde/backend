const express = require("express");

var jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth.middleware");

const PostModel = require("../models/post.model");

const postRouter = express.Router();

postRouter.post("/add",auth,async(req,res)=>{
    const payload = req.body
    try{
        const post =await PostModel(payload);
        await post.save(); 
        res.status(200).send({
            "msg":"Post Details added successfully"
        })
    }
    catch{
        res.status(400).send({
            "msg":"Error while adding post"
        })
    }
});

//get request for getting posts
postRouter.get("/",auth,async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, 'ankesh');
   
    try{
        const {min,max} = req.query
       
       
       // getting posts for between min and max comments
        
       if(min&&max){
            
            const post =await PostModel.find({ $and: [{"userId":decoded.userId}, { no_of_comments: { $gt: +min } }, { no_of_comments: { $lt: +max } } ] });
            res.status(200).json(post);
        }
        
        //getting posts according to device used
        
        else if(req.query.device){
            const post =await PostModel.find({ "device":req.query.device });
            res.status(200).json(post);
        }

        //getting all the posts match with userId

        else{
            const post =await PostModel.find({"userId":decoded.userId});
            res.status(200).json(post);
        }
        
    }
    catch{
        res.status(400).send({
            "msg":"Error while getting post"
        })
    }
});

postRouter.get("/:postId",auth,async(req,res)=>{
    const id = req.params.postId
   
    try{
        const post =await PostModel.find({_id:id});
        res.status(200).json(post)
    }
    catch{
        res.status(400).send({
            "msg":"Error while getting post"
        })
    }
});

// Patch request for update
postRouter.patch("/update/:postId",auth,async(req,res)=>{
    const id = req.params.postId
    const payload = req.body
    try{
        const post =await PostModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({
            "msg":"Post Details updated successfully"
        })
    }
    catch{
        res.status(400).send({
            "msg":"Error while getting post"
        })
    }
});

// Delete request 
postRouter.delete("/delete/:postId",auth,async(req,res)=>{
    const id = req.params.postId
    try{
        const post =await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            "msg":"Post Details deleted successfully"
        })
    }
    catch{
        res.status(400).send({
            "msg":"Error while getting post"
        })
    }
});

module.exports=postRouter