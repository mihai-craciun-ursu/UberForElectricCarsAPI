const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    providerID : {
        required: true,
        type: String
    },
    consumerID : {
        required : true,
        type: String
    },
    pricePerKwCharged : {
        required : true,
        type: Number
    },
    totalPrice: {
        required: true,
        type: Number
    },
    payingMethod: {
        required: true,
        type: String
    },
},
{
    timestamps: true
}
);

const Payment = model("payments", paymentSchema);

module.exports = Payment;