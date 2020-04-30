const router = require("express").Router();
const { routingController } = require("../controllers");
const verifyToken = require("./verifyToken");

router.post('/newRoute', verifyToken, routingController.getNewRoute);




module.exports = router;