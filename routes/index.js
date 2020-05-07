const router = require("express").Router();

const auth = require("./auth");
const user = require("./user");
const cars = require("./cars");
const stations = require("./stations");
const chargingStations = require("./chargingStation");
const routing = require("./routing");
const payment = require("./payment");

router.use("/auth", auth);
router.use("/profile", user);
router.use("/cars", cars);
router.use("/ocpi/cpo/2.2/locations", stations);
router.use("/station", chargingStations);
router.use("/routes", routing);
router.use("/payment", payment);



module.exports = router;