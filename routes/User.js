const express = require("express");
const { body } = require("express-validator/check");
const route = express.Router();

const User = require("../server/UsersSchema");
const userAction = require("../server/RouteAction/Register");

route.post(
  "/register",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("not a valid email"),
    body("username")
      .isLength({ min: 5, max: 15 })
      .withMessage("must be 5 to 15 character long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation is incorrect");
      }
      return true;
    }),
    body("email").custom(value => {
      return User.findOne({ email: value }).then(rec => {
        if (rec) {
          return Promise.reject("E-mail already in use");
        }
        return true;
      });
    })
  ],
  userAction.UserRegistration
);

route.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("not a valid email")
  ],
  userAction.userLogin
);



route.post("/autherize", userAction.authorizeUser, (req, res) => {});

module.exports = route;
