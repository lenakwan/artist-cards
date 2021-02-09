const pricingModel = require('../model/pricingModel');

createPrice = async (req, res) => {
    let body = req.body;
    pricingModel.getPrices(body.id, body.item_name, body.item_price).then((data) => {
        res.status(200).json('New Price added to Database')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

deleteSinglePrice = async (req, res) => {
    let body = req.body;
    pricingModel.deletePrice(body.id, body.item_name).then((data) => {
        res.status(200).json('Price Deleted')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

deleteUserPrices = async (req, res) => {
    let body = req.body;
    pricingModel.deleteAllPrices(body.id).then((data) => {
        res.status(200).json('Price Deleted')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

getUserPrices = async (req, res) => {
    let user_id = req.params.id;
    pricingModel.getPrices(user_id).then((data) => {
        if (data.rowCount == 0) {
            res.status(404).json('User data not found');
        }
        res.status(200).json(data.rows)
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

editSinglePrice = async (req, res) => {
    let body = req.body;
    pricingModel.editPrice(body.id, body.item_name, body.item_price).then((data) => {
        res.status(200).json(body.item_name + ' Edited')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

module.exports = {
    createPrice,
    deleteSinglePrice,
    deleteUserPrices,
    getUserPrices,
    editSinglePrice
}