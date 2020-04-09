const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");


const getListOfAllCars = async (req, res) => {
    try{
        
          const data = await chargetrip.getListOfCars(req.query.make);
          
            
          return res.status(HttpStatusCodes.OK).json({
            success: true,
            data: data
          });
            

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getCarById = async (req, res) => {
    try{
      console.log(req.params.id);
      

      const data = await chargetrip.getCarById(req.params.id);
            
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        data: data
      });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}


module.exports = {
    getListOfAllCars,
    getCarById
  };