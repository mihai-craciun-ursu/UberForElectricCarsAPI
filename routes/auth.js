const router = require("express").Router();

const { authController } = require("../controllers");

router.post("/login", authController.login);
router.post("/register", authController.register)
router.post("/forgotPassword", authController.forgotPassword);
router.post("/forgotPassword/validate", authController.forgotPasswordValidation);

module.exports = router;