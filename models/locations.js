const { Schema, model } = require("mongoose");

const locations = new Schema(
  {
    country_code:{
        country_code: {
            required : true,
            type: String //CiString(2)  only printable ASCII 
        },
        party_id : {
            required : true,
            type: String //CiString(3) 
        },
        id: {
            required : true,
            type: String //CiString(36)
        },
        publish: {
            required : true,
            type: Boolean
        },
        publish_allowed_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PublishTokenType"
        }
    }
  }
)

