const mongoose = require("mongoose");

const DisplayText  = mongoose.model(
  "DisplayText ",
  new mongoose.Schema({
    language: {
        required : true,
        type:String//string(2)
    },
    text: {
        required : true,
        type:String//string(512)
    }
},
{
    timestamps: true
}
));

module.exports =DisplayText ;