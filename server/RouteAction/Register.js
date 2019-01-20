const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator/check");
const User = require("../UsersSchema");
const ErrorHanler = require('./ErrorHandler');

exports.UserRegistration = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { username, email, password, confirmPassword } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = bcrypt.hashSync(password, salt);

    user = new User({
      username,
      email,
      password: encryptedPassword
    });
    user.save().then(response => {
      var token = jwt.sign({ email, id: response._id }, "1wedfghjuik,mnbvfr", {
        expiresIn: "1h"
      });
      res.json(token);
    });
  }
};
exports.userLogin = (req, res,next) => {
    const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return res.json(
            jwt.sign({ email, id: user._id }, "1wedfghjuik,mnbvfr", {
              expiresIn: "1h"
            })
          );
        } else {
          throw ErrorHanler('Invalid credentails, please try again', 402);
        }
        // return res.status(422).json({ errors: "Invalid Credentails" });
      }
      throw ErrorHanler('Cannot find details with email & password',500);
      // return res.status(422).json({ errors: "Invalid Credentails" });
    })
    .catch(error=>{
        console.log(error);
        next(error);
      })
  }
};

exports.authorizeUser = (req, res, next) => {
  // console.log('Autherize user')
  try{
    // console.log(req.headers)
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    const user = jwt.verify(token, "1wedfghjuik,mnbvfr", (error, user) => {
      
      if (error) {
        throw ErrorHanler('Invalid credentails, you must login to access the details!', 401);
      } else {
        User.findById(user.id).then(user => {
          if (!user) {
            //return res.json({ errors: { title: "invalid credentails" } });
            throw ErrorHanler('Invalid credentails, you must login to access the details.', 401);
          }
          else{
            res.locals.user=user;
            next();
          } 
        }).catch(error=>{
          next(ErrorHanler('Invalid credentails, you must login to access the details..', 401));
        })
      }
    });
  }
 catch(error){
   console.log(error)
  throw ErrorHanler('Invalid credentails, you must login to access the details', 401);
 }
};

// module.exports = UserRegistration;
