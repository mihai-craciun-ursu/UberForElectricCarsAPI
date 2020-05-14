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
      console.log(err);
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

const newRoute = async(data) => {

  let plugsString = "";
  data.plugs.forEach(plug => {
    plugsString = plugsString + '{standard: ' + plug.standard + "," + ' chargingPower: ' + plug.chargingPower + "},"
  });
  plugsString = plugsString.substr(0, plugsString.length-1);
  
  let adaptersString = "";
  data.adapters.forEach(adapter => {
    adaptersString = adaptersString + '{standard: ' + adapter.standard + "," + ' chargingPower: ' + adapter.chargingPower + "},"
  });
  adaptersString = adaptersString.substr(0, adaptersString.length-1);

  const query = `mutation {newRoute(
    input: {
      ev: {
        id: "${data.carID}"
        battery: {
          capacity: { value: ${data.max_kilometers}, type: km }
          stateOfCharge: { value: ${data.kilowats_now}, type: kwh }
          finalStateOfCharge: { value: 0, type: kwh }
        }
        plugs: [${plugsString}]
        adapters: [${adaptersString}]
        climate: true
        numberOfPassengers: ${data.number_of_passengers}
      }
      routeRequest: {
        origin: {
          type: Feature
          geometry: { type: Point, coordinates: [${data.origin.longitude}, ${data.origin.latitude}] }
          properties: { name: "${data.origin.address}" }
        }
        destination: {
          type: Feature
          geometry: { type: Point, coordinates: [${data.destination.longitude}, ${data.destination.latitude}] }
          properties: { name: "${data.destination.address}" }
        }
      }
    }
  )}`;

  try{
    const data = await client.request(query);
    return await getRoute(data.newRoute);
  }catch(err){
      return err;
  }
}

const getRoute = async(routeId) => {
  const query = `{route(id: "${routeId}") {
    route {
      id
      charges
      distance
      duration
      consumption
      chargeTime
      rangeStart
      rangeStartKwh
      rangeEnd
      rangeEndKwh
      via
      polyline
      legs {
        id
        distance
        duration
        consumption
        rangeStart
        rangeStartKwh
        rangeEnd
        rangeEndKwh
        origin {
          id
          type
          geometry {
            type
            coordinates
          }
          properties
        }
        destination {
          id
          type
          geometry {
            type
            coordinates
          }
          properties
        }
        type
        name
        stationId
        operatorId
        chargeTime
        evse {
          uid
          evse_id
          physical_reference
          status
          connectors {
            id
            power
            max_amperage
            max_voltage
            max_electric_power
            standard
            format
            power_type
            properties
          }
          parking_restrictions
          properties
        }
        connector {
          id
          power
          max_amperage
          max_voltage
          max_electric_power
          standard
          properties
        }
        plugsAvailable
        plugsCount
      }
    }
    status
  }}`;

  try{
    let data = null;
    do{
      await new Promise(resolve => setTimeout(resolve, 2000));
      data = await client.request(query);
    }while(data.route.status == "processing")
    return data;
  }catch(err){
    return err;
  }
}

module.exports = {
    getListOfCars,
    getCarById,
    newRoute,
    getListOfChargingStations,
    getNearbyListOfChargingStations
}