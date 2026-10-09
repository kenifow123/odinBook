const express = require('express')
const accountRouter = express.Router();
const accountController = require("../controllers/accountController.js");
const passport = require("passport");

accountRouter.post("/signup", accountController.signupPost);
accountRouter.post("/login", accountController.loginPost);

module.exports = accountRouter;