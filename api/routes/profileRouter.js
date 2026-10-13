const express = require("express");
const profileRouter = express.Router();
const passport = require("passport");
const profileController = require("../controllers/profileController.js");
const multer = require("multer");
const upload = multer( { storage : multer.memoryStorage()})

profileRouter.get("/openProfile", passport.authenticate("jwt", { session : false}), profileController.openProfileGet);
profileRouter.post("/createProfile", passport.authenticate("jwt", { session: false}), profileController.createProfilePost);
profileRouter.post("/changeProfilePic",  passport.authenticate("jwt", { session : false}), upload.single("file"), profileController.changeProfilePicPost);



module.exports = profileRouter;