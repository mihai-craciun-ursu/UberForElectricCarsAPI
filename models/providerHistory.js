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

const ProviderHistory = model("providerHistory", providerHistorySchema);

module.exports = ProviderHistory;