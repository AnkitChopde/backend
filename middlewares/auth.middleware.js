var jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        var decoded = jwt.verify(token, 'ankesh');
        if(decoded){
        
            req.body.userId=decoded.userId
            next();
        }else{
            res.status(400).send({
                "msg":"Wrong Credentials"
            })
        }
    }
}

module.exports =auth