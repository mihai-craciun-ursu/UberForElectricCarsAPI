const { Schema, model } = require("mongoose");

const providerHistorySchema = new Schema(
{
    userId: {
        required: true,
        type: String   
    },
    customerLog: {
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

const providerHistory = model("providerHistory", providerHistorySchema);

module.exports = ConsumerHistory;