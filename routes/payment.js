const router = require("express").Router();

const { paymentController } = require("../controllers");
const verifyToken = require("./verifyToken");

router.post('/intend', verifyToken, paymentController.getPaymentIntend); //to add verifyToken
router.get('/success', paymentController.getSuccessPayment);
router.get('/payouts', verifyToken, paymentController.getAllPaymentsToUser);

module.exports = router;