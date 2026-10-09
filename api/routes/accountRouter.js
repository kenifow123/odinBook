import express from "express";
const accountRouter = express.Router();
const accountController = require("../controllers/accountController.js");

accountController.post("/account", accountController.signupPost);

module.exports = accountRouter;