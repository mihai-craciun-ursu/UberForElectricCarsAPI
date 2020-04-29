


# Uber For Electric Cars API

This is the documentation for the Uber For Electric Cars API.

# Endpoints

The list below shows a list of all endpoints currently available in the API for each module.

>For all request there is a `Boolean` field in the body called "success". If the value of the field is `false` then besides the error code the field "message" contains the reason of the failed request.

# Auth Module


##  Login
### Endpoint
`POST /auth/login` 

Auth: None

#### Request Body

|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email			 |String  			         |yes			               |
|password		 |String		             	 |yes    				       |

#### Example Request Body:

```json
{
	"email": "user@test.com",
	"password": "user"
}
```


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |



#### Headers:

`Auth-Token: <String>`
`Refresh-Token: <String>`

#### Example Response

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Email or password incorrect"
}
```

#### Possible error codes and messages
```json 
404 Not Found - "Email or password incorrect"
403 Forbidden - "Email is not confirmed yet"
```



## Register
### Endpoint
`POST /auth/register` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|lastName|String  			         |yes			               |
|firstName|String		             	 |yes    				       |
|phoneNumber|String|yes
|email|String| yes
|password|String| yes|

#### Example Request Body:

```json
{
	"lastName": "Black",
	"firstName": "Estelle",
	"phoneNumber": "+40777777777",
	"email": "user@test.com",
	"password": "user"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "User already exists!"
}
```

#### Possible error codes and messages
```json 
409 Conflict - "User already exists!"
```

## Forgot Password
### Endpoint
`POST /auth/forgotPassword` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email|String  			         |yes			               |
|method|String("sms"/"email")		             	 |yes    				       |

#### Example Request Body:

```json
{
	"email": "user@test.com",
	"method": "email"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "There already exists a request for this email. Please try again in few minutes"
}
```

#### Possible error codes and messages
```json 
409 Conflict - "There already exists a request for this email. Please try again in few minutes"
400 Bad Request - "Invalid method"
403 Forbidden - "Email is not confirmed yet"
```

## Validate Forgot Password
### Endpoint
`POST /auth/forgotPassword/validate` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email|String  			         |yes			               |
|code|String		             	 |yes    				       |

#### Example Request Body

```json
{
	"email": "user@test.com",
	"code": "1234"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Headers:

`Auth-Token: <String>`

>Keep in mind that this Auth-Token will only be available for 10 minutes


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "The code has expired. Please try again. Keep in mind that the code is available only 10 minutes"
}
```

#### Possible error codes and messages
```json 
401 Unauthorized - "The code has expired. Please try again. Keep in mind that the code is available only 10 minutes"
404 Not Found - "The code is not valid. Please try again"
```

## Refresh Auth Token
### Endpoint
`GET /auth/refreshToken` 

Auth: (Header) `Refresh-Token: <String>`

#### Request Body
```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Headers:

`Auth-Token: <String>`



#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
```

# User Module

## User Profile
### Endpoint
`GET /profile` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body
```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|user|User or null|


#### Example Response Body

```json
{
"success":  true,
"user":  {
"firstName":  "Neville",
"lastName":  "Bradlee",
"listOfCars":  [
{
	"id":  "5d161beec9eef4c250d9d225",
	"make":  "BMW",
	"carModel":  "i3s",
	"edition":  "94 Ah",
	"power":  135,
	"acceleration":  6.9,
	"topSpeed":  160,
	"torque":  270,
	"seats":  4,
	"weight":  1340,
	"width":  1791,
	"imagesData":  {
	"image":  {
		"id":  "5d9b3a0396801cc78502c3fc",
		"url":  "https://cars.chargetrip.io/5d9b3a0396801cc78502c3fc.png",
		"width":  1536,
		"height":  864,
		"type":  "image"
	},
	"image_thumbnail":  {
		"id":  "5d9b3a136731e7d8454f925d",
		"url":  "https://cars.chargetrip.io/5d9b3a0396801cc78502c3fc-1570454033.png",
		"width":  131,
		"height":  72,
		"type":  "image_thumbnail"
	},
	"brand":  {
		"id":  "5d9b3a0396801c8eb602c3fb",
		"url":  "https://cars.chargetrip.io/5d9b3a0396801c8eb602c3fb.png",
		"width":  768,
		"height":  432,
		"type":  "brand"
	},
	"brand_thumbnail":  {
		"id":  "5d9b3a116731e718854f925c",
		"url":  "https://cars.chargetrip.io/5d9b3a0396801c8eb602c3fb-1570454033.png",
		"width":  56,
		"height":  24,
		"type":  "brand_thumbnail"
	}
	}
},
],
"listOfChargingStations":  []
}
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Change Password
### Endpoint
`POST /profile/changePassword` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|oldPassword|String or null  			         |
|newPassword|String		             	 |

#### Example Request Body
```json
{
	"oldPassword":  "password"
	"newPassword":  "p@ssword"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|`Boolean`  			         |
|message|`String or null`		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
401 Unauthorized - "Old Password incorrect"
```

## Add Car
### Endpoint
`POST /profile/addCar` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|carId|String		             	 |

#### Example Request Body
```json
{
	"carId":  "5dcd60dd0b58c082922792ea"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## LogOut
### Endpoint
`POST /profile/logout` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

# Station Module


##  Get All Stations
### Endpoint
`GET /station/getAll` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body


```json
{

}
```


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (stationList : Array<[Station](#station)>) or null |



#### Example Response

```json
{
	"success":  true,
	"data" : "stationList" : 
		[
			{Station},
			{Station},
			...
		]
	
}
```


Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
400 Bad Request - "latitude and longitude are required for this request"
```

##  Get Nearby Stations
### Endpoint
`GET /station/getNearby` 

Auth: (Header) `Auth-Token: <String>`

#### Query variables

|FieldName		 |Required					   |Notices |
|----------------|:-------------------------------:|-----------------------------|
|latitude|yes			               ||
|longitude|yes    				       ||
|distance|no  | default 5000
|amenities| no |If there are multiple amenities they should be separated with a comma|

#### Request Body
```json
{

}
```

#### Request Examples
`/stations/getNearby?latitude=44.435398&longitude=26.102527`

`/stations/getNearby?latitude=44.435398&longitude=26.102527&distance=4000`

`/stations/getNearby?latitude=44.435398&longitude=26.102527&distance=4000&amenities=supermarket,hospital` 


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (stationAround : Array<[Station](#station)>) or null |



#### Example Response

```json
{
	"success":  true,
	"data" : "stationAround" : 
		[
			{Station},
			{Station},
			...
		]
	
}
```


Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

### Station Object <a id="station"></a>

|Field name|Type|Description
|-|-|-|
|id|String| ChargeTrip ID
|externalID|String| API database ID
|coordinates|[Coordinates](#Location)|The geo location coordinates
|evse|Array< [Evse](#Evse) >|An array of embedded Charger
|chargers|Array <[Charger](#Charger) >|Groups of EVSEs by power and type
|physical_address|[Address](#Address)|The embedded Address
|amenities|[Amenities](#Amenities) or null|An object with amenity types as key and number of amenities as value
|speed|[StationSpeedType](StationSpeedType)| The global charging speed type for the station
|user|[User](#Operator) or null| Information about the user who has the station (or null if public)
|price_per_kw| Float or null | Price in RON/kwH (null if unknown or public)


### Evse <a id="Evse"></a>
|Field name|Type|Description
|-|-|-|
|uid|String | ID from the API
|status|[StatusEVSE](#StatusEVSE) | ENUM of String
|connectors|Array <[Connector](#Connector)>  

### Charger <a id="Charger"></a>
|Field name|Type|Description
|-|-|-|
|standard|[Standard](#Standard) | Enum of String
|power|Float| output power in kW
|status| [Status](#Status) |
|speed|[StationSpeedType](#StationSpeedType)
|total|Int|Total number of chargers


### Address <a id="Address"></a>
|Field name|Type|Description
|-|-|-|
|city|String
|street|String
|number|String


### Coordinates<a id="Location"></a>
|Field name|Type|Description
|-|-|-|
|latitude|String
|longitude|String|

### Amenities <a id="Amenities"></a>

|Field name|Type|Description
|-|-|-|
|restaurant|Integer|
|bathroom|Integer|
|supermarket|Integer|
|playground|Integer| 
|coffee|Integer|
|shopping|Integer| 
|museum|Integer|
|hotel|Integer|
|park|Integer|
|pharmacy|Integer| 

### Operator<a id="Operator"></a>

|Field name|Type|Description
|-|-|-|
|_id| String | id from API
|firstName| String
|lastName| String
|email| String
|phoneNumber| String

### Connector <a id="Connector"></a>

|Field name|Type|Description
|-|-|-|
|id|String|Id from API (or null for some reason..)
|standard|[Standard](#Standard)| Enum of String
|format|[Format](#Format)| Enum of String
|power_type|[PowerType](#PowerType)| Enum of String
|max_amperage|Integer| max amperage in A
|max_voltage|Integer| max voltage in V
|max_electric_power|Integer| max output electric power in W
|power|Integer| max output electric power in kW

### Status<a id="Status"></a>

|Field name|Type|Description
|-|-|-|
|free|Integer|
|busy|Integer|
|unknown|Integer|
|error|Integer|

### StationSpeedType(ENUM) <a id="StationSpeedType"></a>
|Field name|
|-|
|"slow"|
|"fast"|
|"turbo"|

### StatusEVSE(ENUM) <a id="StatusEVSE">

|Field name|
|-|
  |'AVAILABLE'
 | 'BLOCKED'
  |'CHARGING'
  |'INOPERATIVE'
  |'OUTOFORDER'
  |'PLANNED'
  |'REMOVED'
  |'RESERVED'
  |'UNKNOWN'


### Format(ENUM) <a id="Format"></a>
|Field name|
|:-|
|CABLE
|SOCKET

### PowerType(ENUM)<a id="PowerType"></a>
|Field name|
|:-|
|AC_1_PHASE
|AC_3_PHASE
|DC



### Standard(ENUM) <a id="Standard"></a>
|Field name|
|:-|
|'CHADEMO'|
|'DOMESTIC_A'|
|'DOMESTIC_B'|
|'DOMESTIC_C'|
|'DOMESTIC_D'|
|'DOMESTIC_E'|
|'DOMESTIC_F'|
|'DOMESTIC_G'|
|'DOMESTIC_H'|
|'DOMESTIC_I'|
|'DOMESTIC_J'|
|'DOMESTIC_K'|
|'DOMESTIC_L'|
|'IEC_60309_2_single_16'|
|'IEC_60309_2_three_16'|
|'IEC_60309_2_three_32'|
|'IEC_60309_2_three_64'|
|'IEC_62196_T1'|
|'IEC_62196_T1_COMBO'|
|'IEC_62196_T2'|
|'IEC_62196_T2_COMBO'|
|'IEC_62196_T3A'|
|'IEC_62196_T3C'|
|'PANTOGRAPH_BOTTOM_UP'|
|'PANTOGRAPH_TOP_DOWN'|
|'TESLA_R'|
|'TESLA_S'|