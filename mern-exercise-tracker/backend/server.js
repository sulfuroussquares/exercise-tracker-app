// dependencies: web framework and cors to allow access to resources not on our server
const express = require('express');
const cors = require('cors');

// easy connection to mongodb 
const mongoose = require('mongoose');

// lets us use environment variables defined in a .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// cors middleware and json parsing capability
app.use(cors());
app.use(express.json());

// set database uri
// env variable stored in backend/.env
const uri = process.env.ATLAS_URI;

// start connection; parameters required on newer mongodb apps
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

// once the connection is open, do this
connection.once('open', () => {
    console.log("MongoDB database connection successful.");
});


// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




