const mongoose = require("mongoose");

const PublishTokenType   = mongoose.model(
  "PublishTokenType  ",
  new mongoose.Schema({
    uid: {
		type: String  //CiString(36) Only printable ASCII
	},
	type: {
		type: String //TokenType
	},
	visual_number: {
		type: String //string(64)
	},
	issuer: {
		type: String //string(64)
	},
	group_id: {
		type: String //CiString(36)  Only printable ASCII
	}
},
{
    timestamps: true
}
));

module.exports =PublishTokenType  ;