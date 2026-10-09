require("dotenv").config();

const express = require('express');
const app = express();


app.listen(3000, (error) => {
    if (error) {
        throw error;
    }

    console.log("Odin Book API - listening on port 3000")
})
