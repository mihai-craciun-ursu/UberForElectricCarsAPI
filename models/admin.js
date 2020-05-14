const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    email : {
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

const Admin = model("admins", adminSchema);

module.exports = Admin;