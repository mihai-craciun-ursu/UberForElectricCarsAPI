const mongoose = require("mongoose");

const Location = mongoose.model(
    "Location",
    new  mongoose.Schema({
    country_code: {
        required : true,
        type: String //CiString(2)  only printable ASCII 
    },
    party_id : {
        required : true,
        type: String //CiString(3) 
    },
    publish: {
        required : true,
        type: Boolean
    },
    publish_allowed_to: {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "PublishTokenType"
    },
    name: {
        type: String //string(255)
    },
    address: {
        required : true,
        type: String //string(45)
    },
    city: {
        required : true,
        type: String //string(45)
    },
    postal_code: {
        type: String //string(10)
    },
    state: {
        type: String //string(20)
    },
    country: {
        required : true,
        type: String //string(3) ISO 3166-1 alpha-3 code
    },
    coordinates: {
        required : true,
        type: mongoose.Schema.Types.ObjectId,
	    ref: "GeoLocation" 
    },
    related_locations: [{
        type:mongoose.Schema.Types.ObjectId,
	    ref: "AdditionalGeoLocation"
    }],
    parking_type: {
        type:String, //ParkingType ENUM
        enum:[
            'ALONG_MOTORWAY',
            'PARKING_GARAGE',
            'PARKING_LOT',
            'ON_DRIVEWAY',
            'ON_STREET',
            'UNDERGROUND_GARAGE'
        ]
    },
    evses: [{
        type:mongoose.Schema.Types.ObjectId,
	    ref: "EVSE" 
    }],
    directions: [{
        type:mongoose.Schema.Types.ObjectId,
	    ref: "DisplayText" 
    }],
    operator: {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "BusinessDetails"
    },
    suboperator: {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "BusinessDetails" 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
	    ref: "BusinessDetails" 
    },
    facilities: {
        type:String, //Facility ENUM
        enum:[
            'HOTEL',
            'RESTAURANT',          
            'CAFE',
            'MALL',           
            'SUPERMARKET',
            'SPORT',
            'RECREATION_AREA',
            'NATURE',
            'MUSEUM',
            'BIKE_SHARING',
            'BUS_STOP',
            'TAXI_STAND',
            'TRAM_STOP',
            'METRO_STATION',
            'TRAIN_STATION',
            'AIRPORT',
            'PARKING_LOT',
            'CARPOOL_PARKING',
            'FUEL_STATION',
            'WIFI'
        ]
    },
    time_zone: {
        required : true,
        type: String //string(255)   http://www.iana.org/time-zones
    },
    opening_times: {
        type: mongoose.Schema.Types.ObjectId,
	ref: "Hours" 
    },
    charging_when_closed: {
        default : true,
        type: Boolean
    },
    images: [{
        type:mongoose.Schema.Types.ObjectId,
	ref: "Image"
    }],

    energy_mix: {
        type: mongoose.Schema.Types.ObjectId,
	ref: "EnergyMix"
    },

    last_updated: {
        required : true,
        type: String //DateTime  string(19) 2015-06-29T20:39:09
    }
},
{
    timestamps: true
}
));

module.exports = Location;