const HttpStatusCodes = require("http-status-codes");
const User = require('../models').User;
const AuthToken = require('../models').AuthToken;
const VerificationCode = require('../models').VerificationCode
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Nexmo = require('nexmo');
var nodemailer = require('nodemailer');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await req.db.User.findOne({
        email
      });
  
      if (!user) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          success: false,
          message: "Email or password incorrect"
        });
      }

      //check if password is correct
      const validPass = await bcrypt.compare(password, user.password);

      if(!validPass) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          success: false,
          message: "Email or password incorrect"
        });
      }

      //Create and assign a token
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res.header('Auth-Token', token);

      const authToken = new AuthToken({
        token: token,
        email: email
      });
      const at = await req.db.AuthToken.create(authToken);

      return res.status(HttpStatusCodes.OK).json({
        success: true
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happen!"
      });
    }
  };

  
  
  const register = async (req, res) => {
    //Check if the user is already in the database. If not send 409 Conflict and reject request
    try {
      const existingUser = await req.db.User.findOne({
        email: req.body.email
      })
  
      if (existingUser) {
        return res.status(HttpStatusCodes.CONFLICT).json({
          success: false,
          message: "User already exists!"
        })
      }

      //Hash passwords
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      //Create a new User using given data from Mobile or Web App
      const createdUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        phoneNumber: req.body.phoneNumber
      });
  
      const user = await req.db.User.create(createdUser);

      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_EMAIL);

      //sendConfirmationMail
      const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: user.email, // list of receivers //TO BE CHANGED TO user.email
        subject: 'Uber For Electric Cars Verification Code', // Subject line
        html: `<h3>This is your confirmation link ${process.env.API_URL}/auth/confirmRegister/${token}</h3>`// plain text body
      };

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: process.env.EMAIL,
               pass: process.env.EMAIL_SECRET
           }
       });

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
  
      return res.status(HttpStatusCodes.CREATED).json({
        success: true
      })
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happened!"
      });
    }
  };

  const forgotPassword = async (req, res) => {
    //Check if the user is already in the database. If not send 409 Conflict and reject request
    try {
      const method = req.body.method;
      const email = req.body.email;

      const existingUser = await req.db.VerificationCode.findOne({
        email
      })
  
      if (existingUser) {
        return res.status(HttpStatusCodes.CONFLICT).json({
          success: false,
          message: "There already exists a request for this email. Please try again in few minutes"
        })
      }

      const user = await req.db.User.findOne({
        email
      })
      
      if(method === 'sms'){
        const nexmo = new Nexmo({
          apiKey: process.env.NEXMO_API_KEY,
          apiSecret: process.env.NEXMO_API_SECRET,
        });

        const from = 'Vonage SMS API';
        const to = '40775579053'; //to be changed to user.phoneNumber . When we will have the money

        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        

        const text = randomNumber.toString();
        console.log(text);

        const verificationCode = new VerificationCode({
          code: text,
          email: email
        });
        const vc = await req.db.VerificationCode.create(verificationCode);

        nexmo.message.sendSms(from, to, text);

        return res.status(HttpStatusCodes.OK).json({
          success: true
        });

      }
      
      else if(method === 'email'){
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                 user: process.env.EMAIL,
                 pass: process.env.EMAIL_SECRET
             }
         });

        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        

        const text = randomNumber.toString();

        const verificationCode = new VerificationCode({
          code: text,
          email: email
        });
        const vc = await req.db.VerificationCode.create(verificationCode);

        const mailOptions = {
          from: process.env.EMAIL, // sender address
          to: user.email, // list of receivers //TO BE CHANGED TO user.email
          subject: 'Uber For Electric Cars Verification Code', // Subject line
          html: `<h1>${text}</h1>`// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });

        return res.status(HttpStatusCodes.OK).json({
          success: true
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happened!"
      });
    }
  };

  const forgotPasswordValidation = async (req, res) => {
    try {
      const email = req.body.email;

      const existingUser = await req.db.VerificationCode.findOne({
        email
      })
  
      //if the code does not exist in the partial database that mean it expired
      if (!existingUser) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "The code has expired. Please try again. Keep in mind that the code is available only 10 minutes"
        })
      }
      
      //if the code is not correct then reject the request and delete the code
      if(existingUser.code != req.body.code){
        await req.db.VerificationCode.findOne({
          email
        }).remove().exec();

        return res.status(HttpStatusCodes.CONFLICT).json({
          success: false,
          message: "The code is not valid. Please try again"
        })
      }

      const user = await req.db.User.findOne({
        email
      });

      //Create and assign a token
      const token = jwt.sign({_id: user._id, passChangeState: true}, process.env.TOKEN_SECRET);

      res.header('Auth-Token', token);

      const authToken = new AuthToken({
        token: token,
        email: email,
        temp: true
      });
      const at = await req.db.AuthToken.create(authToken);
  
      return res.status(HttpStatusCodes.OK).json({
        success: true
      });

    }catch(err){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something bad happened!"
      });
    }
  }

  
const confirmRegister = async (req,res) => {
  try{
    const token = req.params.token;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_EMAIL);

    await req.db.User.findOneAndUpdate({
      _id: verified._id
      }, {
          confirmationStatus: true
      });

      return res.status(HttpStatusCodes.OK).json({
        success: true
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
    login,
    register,
    forgotPassword,
    forgotPasswordValidation,
    confirmRegister
  };

  //const verificationCode = new VerificationCode({
 //   code: '1234'
  //});

 // const vc = await req.db.VerificationCode.create(verificationCode);