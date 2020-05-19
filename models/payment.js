const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const paymentSchema = new Schema({
    providerID : {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "users"
    },
    consumerID : {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "users"
    },
    pricePerKwCharged : {
        required : true,
        type: Number
    },
    kwCharged : {
        required: true,
        type: Number
    },
    totalPrice: {
        required: true,
        type: Number
    },
    redirectLink: {
        type: String
    },
    status: {
        required: true,
        type: String,
        default: 'pending'
    }
},
{
    timestamps: true
}
);

const Payment = model("payments", paymentSchema);

module.exports = Payment;