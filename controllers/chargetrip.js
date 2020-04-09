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

module.exports = {
    getListOfCars,
    getCarById
}