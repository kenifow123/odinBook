const express = require('express')
const accountRouter = express.Router();
const accountController = require("../controllers/accountController.js");
const passport = require("passport");

accountRouter.post("/signup", accountController.signupPost);
accountRouter.post("/login", accountController.loginPost);
accountRouter.post("/createFollowRequest/:requestedUserId", passport.authenticate("jwt", { session : false}), accountController.followRequestPost);
accountRouter.put("/acceptFollow/:followerUserId", passport.authenticate("jwt", { session : false}), accountController.acceptFollowPut);
accountRouter.get("/allUsers", passport.authenticate("jwt", { session : false}), accountController.allUsersGet);
accountRouter.get("/currFollowRequests", passport.authenticate("jwt", { session : false}), accountController.currUserFollowRequestsGet);

//dev use route
accountRouter.put("/AfollowB/:followerUserId/:currUserId", accountController.AfollowBPut);



module.exports = accountRouter;