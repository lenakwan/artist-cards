//Import all of the controller commands here for routing.
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let cors = require('cors');
let userController = require('./controller/userController');
let settingsController = require('./controller/settingsController');
const api = express.Router();

api.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
api.use(bodyParser.json())
api.use(cors());


//fix routing to stop displaying CANNOT GET /
api.get('/', (req, res) => res
    .send({
        message: 'Hello! You have reached the server for the artist card project!'
    }));

api.post('/login', userController.loginUser);

api.post('/register', userController.registerUser);

api.post('/userSettings', settingsController.createSetting);

module.exports = api;