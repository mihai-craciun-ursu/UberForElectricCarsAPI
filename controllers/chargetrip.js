const { request, GraphQLClient } = require('graphql-request');
const HttpStatusCodes = require("http-status-codes");

const client = new GraphQLClient('https://staging-api.chargetrip.io/graphql', {
    headers: {
      "x-client-id": `${process.env.TOKEN_AUTH_CHARGETRIP}`,
    },
});


const getListOfCars = async(make) => {
    let query;

        if(make){
          query = `{
            carList(size: 100, page: 0, query: { make: "${make}" }) {
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
        }else{
          query = `{
              carList(size: 100, page: 0) {
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
  const query = `{stationList(size: 100, page: 0) {
    id
    external_id
    coordinates {
      latitude
      longitude
    }
    evses {
      uid
      status
      connectors {
        id
        standard
        format
        power_type
        max_voltage
        max_amperage
        max_electric_power
        power
      }
    }
    chargers {
      standard
      power
      speed
      status {
        free
        busy
        unknown
        error
      }
      total
    }
    physical_address {
      city
      street
      number
    }
    amenities
    speed
  }}`

  try{
      const data = await client.request(query);
      return data;
  }catch(err){
      return err;
  }
}

const getNearbyListOfChargingStations = async(latitude, longitude, distance, amenities) => {
  let amenitiesString = '';
  if(amenities){
    amenities.forEach(ameniti => {
      amenitiesString = amenitiesString + '"' + ameniti + '",'
    });
    amenitiesString = amenitiesString.substr(0, amenitiesString.length - 1);
  }else{
    amenitiesString = null;
  }
  const query = `{stationAround(
    size: 100,
    page: 0,
    query: {
      location: { type: Point, coordinates: [${longitude}, ${latitude}] }
      distance: ${distance}
      ${amenities == null ? '' : 'amenities: [' + amenitiesString + ']'}
    }
  ) {
    id
    external_id
    coordinates {
      latitude
      longitude
    }
    evses {
      uid
      status
      connectors {
        id
        standard
        format
        power_type
        max_voltage
        max_amperage
        max_electric_power
        power
      }
    }
    chargers {
      standard
      power
      speed
      status {
        free
        busy
        unknown
        error
      }
      total
    }
    physical_address {
      city
      street
      number
    }
    amenities
    speed
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