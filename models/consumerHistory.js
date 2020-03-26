const { Schema, model } = require("mongoose");

const consumerHistorySchema = new Schema(
{
    userId: {
        required: true,
        type: String   
    },
    providersLog: {
        required: true,
        type: Array
    },
    invoiceLog: {
        required: true,
        type: Array
    }
},
{
    timestamps: true
}
);

const ConsumerHistory = model("cosumerHistory", consumerHistorySchema);

module.exports = ConsumerHistory;