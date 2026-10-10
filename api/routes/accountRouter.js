const express = require('express')
const accountRouter = express.Router();
const accountController = require("../controllers/accountController.js");
const passport = require("passport");

accountRouter.post("/signup", accountController.signupPost);
accountRouter.post("/login", accountController.loginPost);
accountRouter.put("/followRequest/:requestedUserId", passport.authenticate("jwt", { session : false}), accountController.followRequestPut);
accountRouter.put("/acceptFollow/:followerUserId", passport.authenticate("jwt", { session : false}), accountController.acceptFollowPut);


module.exports = accountRouter;