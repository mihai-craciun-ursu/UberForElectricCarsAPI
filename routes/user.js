const router = require("express").Router();

const { userController } = require("../controllers");
const verifyToken = require("./verifyToken");
const verifyCar = require("./verifyCar");

router.get('/', verifyToken, userController.getUser);
router.post('/changePassword', verifyToken, userController.changePassword);
router.post('/logout', verifyToken, userController.logout);
router.post('/addCar', verifyToken, verifyCar, userController.addCar);
router.post('/addStation', verifyToken, userController.addStation);

module.exports = router;