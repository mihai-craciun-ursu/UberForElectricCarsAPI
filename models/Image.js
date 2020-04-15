const mongoose = require("mongoose");

const Image  = mongoose.model(
  "Image ",
  new mongoose.Schema({
    url: {
        required : true,
        type: string //URL  w3.org spec
    },
    thumbnail: {
	required: true,
        type:string //URL  w3.org spec
    },
    category: {
        required : true,
        type: String, //ImageCategory ENUM
        enum:[ 'CHARGER',
               'ENTRANCE',
               'LOCATION',
               'NETWORK',
               'OPERATOR',
               'OTHER',
               'OWNER']
    },
    type: {
        required : true,
        type: String //CiString(4)   gif,jpeg,png,svg
    },
    width: {
	required: true,
        type:Number //int(5)
    },
    height: {
	required: true,
        type:Number  //int(5)
    }  
},
{
    timestamps: true
}
));

module.exports =Image ;