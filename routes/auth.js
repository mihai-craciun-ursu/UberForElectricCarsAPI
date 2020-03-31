const router = require("express").Router();

const { authController } = require("../controllers");
const verifyEmail = require("./verifyEmail");

router.post("/login", verifyEmail, authController.login);
router.post("/register", authController.register)
router.post("/forgotPassword", verifyEmail, authController.forgotPassword);
router.post("/forgotPassword/validate", verifyEmail, authController.forgotPasswordValidation);
router.get("/confirmRegister/:token", authController.confirmRegister);

module.exports = router;