const jwt = require('jsonwebtoken');
const HttpStatusCodes = require("http-status-codes");


module.exports = function (req, res, next){
    const token = req.header('auth-token');

    if(!token){
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid token"
          });
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err){
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid token"
          });
    }
}