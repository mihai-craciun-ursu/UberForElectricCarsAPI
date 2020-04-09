const router = require("express").Router();

const { carController } = require("../controllers");
const verifyToken = require("./verifyToken");

router.get('/getAll', verifyToken, carController.getListOfAllCars);
router.get('/getCarInfo/:id', verifyToken, carController.getCarById);


module.exports = router;