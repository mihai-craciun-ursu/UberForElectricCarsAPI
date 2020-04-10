const router = require("express").Router();
const { stationController } = require("../controllers");


router.get('/', stationController.getListOfAllStations);
router.get('/:id', stationController.getStationById);
router.get('/:id/:idEVSE', stationController.getEVSEById);
router.get('/:id/:idEVSE/:idConnector', stationController.getConnectorById);



module.exports = router;