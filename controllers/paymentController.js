const paypal = require('paypal-rest-sdk');
const HttpStatusCodes = require("http-status-codes");
const Location = require("../models").Location;
const User = require('../models').User;
const Payment = require('../models').Payment;


paypal.configure({
    'mode': 'sandbox',
    'client_id': `${process.env.PAYPAL_USER_ID}`,
    'client_secret': `${process.env.PAYPAL_USER_SECRET}`
});


// 1c. Set up the SDK client


const getPaymentIntend = async (req, res) => {

    try{
        const kwH = req.body.kwH;
        const userId = req.user._id;
        const payerData = await req.db.User.findOne({
            _id: userId
        });

        const locationData = await req.db.Location.findOne({
            _id: req.body.stationId
        }).populate('user');

        

        const payeeData = await req.db.User.findOne({
            _id: locationData.user._id
        });

        const price = (Number(locationData.price_per_kw)*kwH) / 4.2;

        const createdPayment = new Payment({
            providerID: payeeData,
            consumerID: payerData,
            pricePerKwCharged: Number(locationData.price_per_kw),
            totalPrice: (Number(locationData.price_per_kw)*kwH),
            kwCharged: kwH,
            status: "pending"
          });
      
          const paymentObj = await req.db.Payment.create(createdPayment);
    
    

        

    const create_payment_json = {
        "intent" : "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls":{
            "return_url": `https://uber-electric.herokuapp.com/payment/success?payee=${payeeData.paypalEmail}&price=${Number(price).toFixed(2)}&paymentObjDb=${paymentObj._id}`,
            "cancel_url": `https://uber-electric.herokuapp.com/payment/cancel?payee=${payeeData.paypalEmail}&price=${Number(price).toFixed(2)}&paymentObjDb=${paymentObj._id}`
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "kwH",
                    "sku": "001",
                    "price": `${Number(price).toFixed(2)}`,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency" : "USD",
                "total": `${Number(price).toFixed(2)}`
            },
            "description": "Payment for your charging",
            
        }]
    };

    

    paypal.payment.create(create_payment_json, function(error, payment){
        if(error){
            console.log(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something bad happen!"
              });
        }else{

            let redirectLink = '';
            payment.links.forEach(link => {
                if(link.rel == 'approval_url'){
                    redirectLink = link.href;
                }
            });

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                payment: redirectLink
              });
        }

        
    })

}catch(err){
    console.log(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happen!"
      });
}


    // request.requestBody({
    //   intent: 'sale',
    //   purchase_units: [{
    //     amount: {
    //       currency_code: 'USD',
    //       value: '1.00'
    //     },
    //     payee: {
    //       email_address: 'sb-prrb471684352@personal.example.com'
    //     }
    //   }]
      
    // });
  
    
}

const getSuccessPayment = async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const payee = req.query.payee;
    const price = req.query.price;
    const paymentObj = req.query.paymentObjDb;

    

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": price
            }
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){
        if(error){
            console.log(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something bad happen!"
              });   
        } else {
            //payouts
            var sender_batch_id = Math.random().toString(36).substring(9);

            var create_payout_json = {
                "sender_batch_header": {
                    "sender_batch_id": sender_batch_id,
                    "email_subject": "You have a payment"
                },
                "items": [
                    {
                        "recipient_type": "EMAIL",
                        "amount": {
                            "value": price,
                            "currency": "USD"
                        },
                        "receiver": payee,
                        "note": "Thank you.",
                        "sender_item_id": "item_3"
                        }
                    ]
                };

                paypal.payout.create(create_payout_json, function (error, payout) {
                    if (error) {
                        console.log(error.response);
                    } else {
                        req.db.Payment.findOneAndUpdate({
                            _id: paymentObj
                        }, {
                            status: "complete"
                        }, function(err, result) {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log("Success Payment");
                            }
                            }
                        );
                    }
                });

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                payment: payment
              });
        }
    });
}

const getCancelledPayment = async (req, res) => {

    const paymentObj = req.query.paymentObjDb;

    req.db.Payment.findOneAndUpdate({
        _id: paymentObj
    }, {
        status: "cancelled"
    }, function(err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("Failed Payment");
        }
        }
    );

    return res.status(HttpStatusCodes.OK).json({
        success: false,
        message: "Cancelled Payment"
      });
    
}

const getAllPaymentsToUser = async (req, res) => {
    
    try{
        const userId = req.user._id;

        const userData = await req.db.User.findOne({
            _id: userId
        });

        const payments = await req.db.Payment.find({
            providerID: userId
        }).populate("providerID").populate("consumerID");

        let paymentsToBeReturned = [];
        payments.forEach(payment => {
            let paymentObject = {
                id: payment._id,
                status: payment.status,
                provider: payment.providerID.firstName + ' ' + payment.providerID.lastName,
                providerEmail: payment.providerID.email,
                consumer: payment.consumerID.firstName + ' ' + payment.consumerID.lastName,
                consumerEmail: payment.consumerID.email,
                pricePerKwCharged : payment.pricePerKwCharged,
                totalPrice : payment.totalPrice,
                kwCharged : payment.kwCharged,
                createdDate : payment.createdAt,
                lastStatusUpdate : payment.updatedAt
            }

            paymentsToBeReturned.push(paymentObject)
        });


        return res.status(HttpStatusCodes.OK).json({
                    success: true,
                    payments: paymentsToBeReturned
                });
    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });  
    }

}

const getAllPaymentsFromAUser= async (req, res) => {
    try{
        const userId = req.user._id;

        const userData = await req.db.User.findOne({
            _id: userId
        });

        const payments = await req.db.Payment.find({
            consumerID: userId
        }).populate("providerID").populate("consumerID");

        let paymentsToBeReturned = [];
        payments.forEach(payment => {
            let paymentObject = {
                id: payment._id,
                status: payment.status,
                provider: payment.providerID.firstName + ' ' + payment.providerID.lastName,
                providerEmail: payment.providerID.email,
                consumer: payment.consumerID.firstName + ' ' + payment.consumerID.lastName,
                consumerEmail: payment.consumerID.email,
                pricePerKwCharged : payment.pricePerKwCharged,
                totalPrice : payment.totalPrice,
                kwCharged : payment.kwCharged,
                createdDate : payment.createdAt,
                lastStatusUpdate : payment.updatedAt
            }

            paymentsToBeReturned.push(paymentObject)
        });


        return res.status(HttpStatusCodes.OK).json({
                    success: true,
                    payments: paymentsToBeReturned
                });
    }catch(err){
        console.log(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });  
    }
}


module.exports = {
    getPaymentIntend,
    getSuccessPayment,
    getCancelledPayment,
    getAllPaymentsToUser,
    getAllPaymentsFromAUser
}