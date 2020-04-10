const jwt = require('jsonwebtoken');
const HttpStatusCodes = require("http-status-codes");




module.exports = async (req, res, next) => {
    const token = req.header('Refresh-Token');

    if(!token){
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Token not found"
          });
    }

    try{

        const verified = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
        req.user = verified;
        next();
    }catch (err){
        return res.status(HttpStatusCodes.FORBIDDEN).json({
            success: false,
            message: "Invalid token"
          });
    }
}