const { request, GraphQLClient } = require('graphql-request');
const HttpStatusCodes = require("http-status-codes");

const client = new GraphQLClient('https://api.chargetrip.io/graphql', {
    headers: {
      "x-client-id": `${process.env.TOKEN_AUTH_CHARGETRIP}`,
    },
});


const getListOfCars = async(make) => {
    let query;

        if(make){
          query = `{
            carList(query: { make: "${make}" }) {
              id
              make
              carModel
              edition
              imagesData {
                  image {
                      id
                      url
                      width
                      height
                      type
                  }
                  image_thumbnail {
                      id
                      url
                      width
                      height
                      type
                  }
                  brand {
                      id
                      url
                      width
                      height
                      type
                  }
                  brand_thumbnail {
                      id
                      url
                      width
                      height
                      type
                  }
              }
            }
          }`
        }else{
          query = `{
              carList {
                id
                make
                carModel
                edition
                imagesData {
                  image {
                    id
                    url
                    width
                    height
                    type
                  }
                  image_thumbnail {
                    id
                    url
                    width
                    height
                    type
                  }
                  brand {
                    id
                    url
                    width
                    height
                    type
                  }
                  brand_thumbnail {
                    id
                    url
                    width
                    height
                    type
                  }
                }
              }
            }`
          }
          try{
            const data = await client.request(query);
            return data;
        }catch(err){
            return err;
        }
}

const getCarById = async(id) => {
    const query = `{
        car(id: "${id}") {
        id
        make
        carModel
        edition
        power
        acceleration
        topSpeed
        torque
        seats
        weight
        width
        imagesData {
            image {
                id
                url
                width
                height
                type
            }
            image_thumbnail {
                id
                url
                width
                height
                type
            }
            brand {
                id
                url
                width
                height
                type
            }
            brand_thumbnail {
                id
                url
                width
                height
                type
            }
        }
        }
    }`

    try{
        const data = await client.request(query);
        return data;
    }catch(err){
        return err;
    }
}

const getListOfChargingStations = async() => {
  const query = `{stationList {
    id
    externalId
    name
    location {
      type
      coordinates
    }
    elevation
    evses {
      externalId
      evseId
      physicalReference
      connectors {
        externalId
        ocpiId
        power
        amps
        voltage
        type
        status
        properties
      }
      parkingRestriction
      properties
      paymentMethod
      price {
        value
        currency
        model
        displayValue
      }
    }
    chargers {
      type
      power
      price
      speed
      status {
        free
        busy
        unknown
        error
      }
      total
    }
    operator {
      name
    }
    owner {
      name
    }
    address {
      continent
      country
      county
      city
      street
      number
      postalCode
      what3Words
      formattedAddress
    }
    amenities
    properties
    realtime
    openingHours
    open24h
    timezone
    lastUsedDate
    power
    speed
    status
    review {
      rating
      count
    }
  }}`

  try{
      const data = await client.request(query);
      return data;
  }catch(err){
      return err;
  }
}

const getNearbyListOfChargingStations = async(latitude, longitude, distance, amenities) => {
  const query = `{stationAround(
    query: {
      location: { type: Point, coordinates: [${latitude}, ${longitude}] }
      distance: ${distance}
      ${amenities ? "amenities:" + amenities : ""}
    }
  ) {
    id
    externalId
    name
    location {
      type
      coordinates
    }
    elevation
    evses {
      externalId
      evseId
      physicalReference
      connectors {
        externalId
        ocpiId
        power
        amps
        voltage
        type
        status
        properties
      }
      parkingRestriction
      properties
      paymentMethod
      price {
        value
        currency
        model
        displayValue
      }
    }
    chargers {
      type
      power
      price
      speed
      status {
        free
        busy
        unknown
        error
      }
      total
    }
    operator {
      name
    }
    owner {
      name
    }
    address {
      continent
      country
      county
      city
      street
      number
      postalCode
      what3Words
      formattedAddress
    }
    amenities
    properties
    realtime
    openingHours
    open24h
    timezone
    lastUsedDate
    power
    speed
    status
    review {
      rating
      count
    }
}}`

  try{
      const data = await client.request(query);
      return data;
  }catch(err){
      return err;
  }
}

module.exports = {
    getListOfCars,
    getCarById,
    getListOfChargingStations,
    getNearbyListOfChargingStations
}