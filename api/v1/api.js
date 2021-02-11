//Import all of the controller commands here for routing.
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let cors = require('cors');
const userController = require('./controller/userController');
const settingsController = require('./controller/settingsController');
const linkController = require('./controller/linkController');
const pricingController = require('./controller/pricingController');
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

api.get('/user/:username', userController.searchUser);

api.post('/register', userController.registerUser);

api.post('/userSettings', settingsController.createSetting);

api.get('/userSettings/:id', settingsController.getUserSettings);

api.put('/userPricing/:id', settingsController.changePricing);

api.put('/userContent/:id', settingsController.changeContentSettings);

api.put('/userProfile/:id', settingsController.changeProfilePicture);

api.put('/userHeader/:id', settingsController.changeUserHeader);

api.put('/userBackground/:id', settingsController.changeUserBackground);

api.get('/categories', settingsController.getUniqueCategories);

api.get('/categories/:category', settingsController.getCategoryUsers);

api.put('/userStatus/:id', settingsController.changeCommissionStatus);

api.put('/userName/:id', settingsController.changeUserName);

api.post('/links', linkController.addUserLink);

api.get('/links/:id', linkController.getUserLinks);

api.delete('/links/:id', linkController.deleteUserLink);

api.post('/pricing', pricingController.createPrice);

api.get('/pricing/:id', pricingController.getUserPrices);

api.delete('/pricing/:id', pricingController.deleteUserPrices);

api.delete('/price/:id', pricingController.deleteSinglePrice);

api.put('/price/:id', pricingController.editSinglePrice);


module.exports = api;