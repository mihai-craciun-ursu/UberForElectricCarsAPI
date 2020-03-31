const User = require('../models').User;
const HttpStatusCodes = require("http-status-codes");


module.exports = async (req, res, next) => {
  const email = req.body.email;
  
  try{
    const user = await req.db.User.findOne({
      email
    });
    
    if(!user.confirmationStatus){
      return res.status(HttpStatusCodes.FORBIDDEN).json({
        success: false,
        message: "Email is not confirmed yet"
      });
    }else{
      next();
    }
  }catch(err){
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happen!"
      });
  }
}  