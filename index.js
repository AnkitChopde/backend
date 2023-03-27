const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors');
const connection = require("./configs/db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const auth = require("./middlewares/auth.middleware");
app.use(express.json());
app.use(cors())

app.use("/users",userRouter)

app.use("/posts",postRouter)
postRouter.use(auth)
app.get("/",(req,res)=>{
    console.log("Home Page");
});

app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("connected to mongoDatabase")
    }
    catch(err){
    console.log("error")
    }
    console.log("server is running")
})



// {
//     "title":"post",
//     "body":"hi everyone",
//     "device":"laptop",
//     "no_of_comments":100
// }

// {
//     "email": "acc@gmail.com",
//     "password": "123",
//     "gender":"Male",
//     "age":20,
//     "city":"Nagpur",
//     "is_married":false
// }