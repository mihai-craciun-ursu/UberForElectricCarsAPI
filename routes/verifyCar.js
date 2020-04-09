const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("../controllers").chargetrip;

module.exports = async (req, res, next) => {
  try{
    const data = await chargetrip.getCarById(req.body.carId);

    if(data.car == null){
      console.error(error);
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid car ID"
      });
    }


    req.carId = req.body.carId;
    next();
  }catch(error){
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happen!"
      });
  }
}  