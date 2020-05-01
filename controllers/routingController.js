const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");

const getNewRoute = async (req, res) => {
    try{
        const data = await chargetrip.newRoute(req.body);

        if(data.route.status == "done"){
            let legsArray = [];

            if(data.route.route.charges > 0){
                data.route.route.legs.forEach((leg, index) => {
                    if(leg.type == "station"){
                        let legObj = {
                            stationId: leg.stationId,
                            chargeTime: leg.chargeTime,
                            chargeKW: data.route.route.legs[index+1].rangeStartKwh - leg.rangeEndKwh
                        }
                        legsArray.push(legObj);
                    }
                });
            }

            const route = {
                status: data.route.status,
                charges: data.route.route.charges,
                distance: data.route.route.distance,
                duration: data.route.route.duration,
                consumption: data.route.route.consumption,
                rangeStartKwh: data.route.route.rangeStartKwh,
                rangeEndKwh: data.route.route.rangeEndKwh,
                legs: legsArray,
                polyline: data.route.route.polyline,
                
            }
            return res.status(HttpStatusCodes.OK).json({
                success: true,
                route: route
            });
        }else{
            return res.status(HttpStatusCodes.OK).json({
                success: true,
                route: data.route
            });
        }
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

module.exports = {
    getNewRoute
  };