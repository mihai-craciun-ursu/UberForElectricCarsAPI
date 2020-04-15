const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");


const getListOfAllChargingStations = async (req, res) => {
    try{
        
          const data = await chargetrip.getListOfChargingStations()
          
            
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

const getNearbyChargingStations = async (req, res) => {
    try{

      if(!req.body.latitude || !req.body.longitude){
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            success: false,
            message: "latitude and longitude are required for this request"
          });
      }
      
      const distance = req.body.distance || 5000;
      const amenities = req.body.amenities || null; 

      

      const data = await chargetrip.getNearbyListOfChargingStations(req.body.latitude, req.body.longitude, distance, amenities);
            
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
    getListOfAllChargingStations,
    getNearbyChargingStations
  };