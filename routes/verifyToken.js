const jwt = require('jsonwebtoken');
const HttpStatusCodes = require("http-status-codes");
const AuthToken = require('../models').AuthToken;



module.exports = async (req, res, next) => {
    const token = req.header('auth-token');

    if(!token){
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Token not found"
          });
    }

    try{

        const at = await req.db.AuthToken.findOne({
            token: token
        });
        
        if(!at){
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Token Expired"
              });
        }

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err){
        return res.status(HttpStatusCodes.FORBIDDEN).json({
            success: false,
            message: "Invalid token"
          });
    }
}