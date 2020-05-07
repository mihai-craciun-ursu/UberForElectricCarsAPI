const router = require("express").Router();

const { paymentController } = require("../controllers");
const verifyToken = require("./verifyToken");

router.post('/intend', verifyToken, paymentController.getPaymentIntend); //to add verifyToken
router.get('/success', paymentController.getSuccessPayment);
router.get('cancel', paymentController.getCancelledPayment);
router.get('/payouts', verifyToken, paymentController.getAllPaymentsToUser);
router.get('/payments', verifyToken, paymentController.getAllPaymentsFromAUser);

module.exports = router;