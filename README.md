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
|email			 |`String`  			         |yes			               |
|password		 |`String`		             	 |yes    				       |

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
|success|`Boolean`  			         |
|message|`String or null`		             	 |



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
|lastName|`String`  			         |yes			               |
|firstName|`String`		             	 |yes    				       |
|phoneNumber|`String`|yes
|email|`String`| yes
|password|`String`| yes|

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
|email|`String`  			         |yes			               |
|method|`String("sms"/"email")`		             	 |yes    				       |

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
|email|`String`  			         |yes			               |
|code|`String`		             	 |yes    				       |

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
|success|`Boolean`  			         |
|message|`String or null`		             	 |

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
|success|`Boolean`  			         |
|message|`String or null`		             	 |

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
|success|`Boolean`  			         |
|message|`String or null`		             	 |
|user|`User or null`|


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
|oldPassword|`String or null`  			         |
|newPassword|`String`		             	 |

#### Example Request Body
```json
{
	"oldPassword":  "password",
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
|carId|`String`		             	 |

#### Example Request Body
```json
{
	"carId":  "5dcd60dd0b58c082922792ea"
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
```