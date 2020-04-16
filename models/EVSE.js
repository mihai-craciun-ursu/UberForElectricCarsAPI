const mongoose = require("mongoose");

const EVSE  = mongoose.model(
  "EVSE",
  new mongoose.Schema({
    evse_id: {
        type: String//CiString(48)
    },
    status: {
        required:true,
        type: String,
        enum:[//~Status~
            'AVAILABLE',
            'BLOCKED',
            'CHARGING',
            'INOPERATIVE',
            'OUTOFORDER',
            'PLANNED',
            'REMOVED',
            'RESERVED',
            'UNKNOWN' ]
    },
    status_schedule:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StatusSchedule"
    }],
    capabilities: [{
        type: String,
        enum:[//~Capability~
            'CHARGING_PROFILE_CAPABLE',
        'CHARGING_PREFERENCES_CAPABLE',
        'CHIP_CARD_SUPPORT',
        'CONTACTLESS_CARD_SUPPORT',
        'CREDIT_CARD_PAYABLE',
        'DEBIT_CARD_PAYABLE',
        'PED_TERMINAL',
        'REMOTE_START_STOP_CAPABLE',
        'RESERVABLE',
        'RFID_READER',
        'TOKEN_GROUP_CAPABLE',
        'UNLOCK_CAPABLE'
        ]
    }],
    connectors: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Connector"
    }],
    floor_level: {
        type: String//string(4)
    },
    coordinates: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "GeoLocation"
    },
    physical_reference: {
        type: String//string(16)
    },
    directions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DisplayText"
    }],
    parking_restrictions: {
        type: String,
        enum: [//~ParkingRestriction~
            'EV_ONLY',
            'PLUGGED',
            'DISABLED',
            'CUSTOMERS',
            'MOTORCYCLES']
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }],
    last_updated: {
        required: true,
        type : String // DateTime
    }
},
{
    timestamps: true
}
));

module.exports = EVSE ;