const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 
let cors = require('cors');
const apiVersion1 = require("./api/v1/api");

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json()) 
app.use(cors());
// this lets me do versioning so i can make changes to v2 while leaving v1 up and running!
app.use("/v1", apiVersion1);


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});