const router = require("express").Router();

const { userController } = require("../controllers");
const verifyToken = require("./verifyToken");
const verifyCar = require("./verifyCar");

router.get('/', verifyToken, userController.getUser);
router.put('/reset', verifyToken, userController.changeDetails);
router.post('/changePassword', verifyToken, userController.changePassword);
router.post('/logout', verifyToken, userController.logout);
router.post('/addCar', verifyToken, verifyCar, userController.addCar);
router.post('/addStation', verifyToken, userController.addStation);
router.post('/removeCar', verifyToken, userController.removeCar);
router.post('/removeStation', verifyToken, userController.removeStation);

module.exports = router;