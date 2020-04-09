const router = require("express").Router();

const auth = require("./auth");
const user = require("./user");
const cars = require("./cars");

router.use("/auth", auth);
router.use("/profile", user);
router.use("/cars", cars);



module.exports = router;