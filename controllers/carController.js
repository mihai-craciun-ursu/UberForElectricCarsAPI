const { request, GraphQLClient } = require('graphql-request');
const HttpStatusCodes = require("http-status-codes");

const client = new GraphQLClient('https://api.chargetrip.io/graphql', {
    headers: {
      "x-client-id": `'${process.env.TOKEN_AUTH_CHARGETRIP}'`,
    },
});

const getListOfAllCars = async (req, res) => {
    try{
        let query;

        if(req.query.make){
          query = `{
            carList(query: { make: "${req.query.make}" }) {
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


          client.request(query).then(data => {
            
              return res.status(HttpStatusCodes.OK).json({
                success: true,
                data: data
              });
            });

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getCarById = async (req, res) => {
    try{
        const id = req.params.id;

        const query = `{
            car(id: "${id}") {
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

        client.request(query).then(data => {
          
            return res.status(HttpStatusCodes.OK).json({
              success: true,
              data: data
            });
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}


module.exports = {
    getListOfAllCars,
    getCarById
  };