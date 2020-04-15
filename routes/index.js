const router = require("express").Router();

const auth = require("./auth");
const user = require("./user");
const cars = require("./cars");
const stations = require("./stations");
const chargingStations = require("./chargingStation");

router.use("/auth", auth);
router.use("/profile", user);
router.use("/cars", cars);
router.use("/ocpi/cpo/2.2/locations", stations);
router.use("/station", chargingStations);



module.exports = router;