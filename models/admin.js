const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    workEmail : {
        required : true,
        type: String
    },
    workPhone : {
        required: true,
        type: String
    },
    userName: {
        required : true,
        type: String
    },
    password: {
        required : true,
        type: String
    }
},
{
    timestamps: true
}
);

const admin = model("admins", adminSchema);

module.exports = admin;