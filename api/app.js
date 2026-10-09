const cors = require("cors");
require("dotenv").config();
const accountRouter = require('./routes/accountRouter.js')

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account', accountRouter);


app.listen(3000, (error) => {
    if (error) {
        throw error;
    }

    console.log("Odin Book API - listening on port 3000")
})
