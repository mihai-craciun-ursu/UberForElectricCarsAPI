const router = require("express").Router();
const { chargingStationController } = require("../controllers");
const verifyToken = require("./verifyToken");


router.get('/getAll', verifyToken, chargingStationController.getListOfAllChargingStations);
router.get('/getNearby',verifyToken, chargingStationController.getNearbyChargingStations);



module.exports = router;