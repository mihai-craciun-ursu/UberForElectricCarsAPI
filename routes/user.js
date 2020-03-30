const router = require("express").Router();

const { userController } = require("../controllers");
const verifyToken = require("./verifyToken");

router.get('/', verifyToken, userController.getUser);
router.post('/changePassword', verifyToken, userController.changePassword);

module.exports = router;