const express = require('express')
const accountRouter = express.Router();
const accountController = require("../controllers/accountController.js");
const passport = require("passport");

accountRouter.post("/signup", accountController.signupPost);
accountRouter.post("/login", accountController.loginPost);
accountRouter.post("/createFollowRequest/:requestedUserId", passport.authenticate("jwt", { session : false}), accountController.followRequestPost);
accountRouter.put("/acceptFollow/:followerUserId", passport.authenticate("jwt", { session : false}), accountController.acceptFollowPut);
accountRouter.get("/allUsers", passport.authenticate("jwt", { session : false}), accountController.allUsersGet);
accountRouter.get("/getFollowRequests", passport.authenticate("jwt", { session : false}), accountController.currUserFollowRequestsGet);
accountRouter.get("/requestedUserFollowRequests", passport.authenticate("jwt", { session : false}), accountController.requestedUserFollowRequestsGet)

accountRouter.delete("/deleteFollowRequest/:id", accountController.followRequestDelete)
//dev use route
accountRouter.put("/AfollowB/:followerUserId/:currUserId", accountController.AfollowBPut);



module.exports = accountRouter;