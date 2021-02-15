const settingsModel = require('../model/settingsModel');


// id, category, name, user_status, bg_img, bg_link, bg_color, header_bg_img, header_bg_link, header_bg_color, profile_img, content_color, pricing
createSetting = async (req, res) => {
    let body = req.body;
    settingsModel.createSetting(body.id, body.category, body.name, body.user_status, body.bg_img, body.bg_link,
        body.bg_color, body.header_bg_img, body.header_bg_link, body.header_bg_color, body.profile_img, body.content_color, body.pricing).then((data) => {
        res.status(200).json('User Setting added to Database');
    }).catch(err => res.status(500).json({
        message: "Error 500 Internal Server Error: " + err.message
    }));
}

getUniqueCategories = async (req, res) => {
    settingsModel.retrieveUniqueCategories().then((data) => {
        res.status(200).json(data.rows);
    }).catch(err => res.status(500).json({
        message: "Error 500 Internal Server Error: " + err.message
    }));
}

getUserSettings = async (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        res.status(401).json('Unauthorized Request.')
    } else {
        settingsModel.retrieveSettings(user_id).then((data) => {
            res.status(200).json(data.rows);
        }).catch(err => res.status(500).json({
            message: "Error 500 Internal Server Error: " + err.message
        }));
    }
}

changePricing = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.togglePricing(user_id, body.pricing).then((data) => {
        res.status(200).json('Show Pricing for Page set to ' + body.pricing);
    }).catch(err => res.status(500).json({
        message: "Error 500 Internal Server Error: " + err.message
    }))
}

changeContentSettings = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeContentColor(user_id, body.content_color).then((data) => {
        res.status(200).json('Content Color set to: ' + body.content_color)
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

changeProfilePicture = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeProfile(user_id, body.profile_img).then((data) => {
        res.status(200).json('User profile picture was changed.')
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

changeUserHeader = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeHeader(user_id, body.header_bg_img, body.header_bg_link, body.header_bg_color).then((data) => {
        res.status(200).json('Header settings changed.')
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

changeUserBackground = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeBackground(user_id, body.bg_img, body.bg_link, body.bg_color).then((data) => {
        res.status(200).json('Background settings changed.')
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

changeCommissionStatus = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeStoreStatus(user_id, body.status).then((data) => {
        res.status(200).json('Commision status changed to ' + body.status)
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

changeUserName = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    settingsModel.changeDisplayName(user_id, body.name).then((data) => {
        res.status(200).json('Display name changed to ' + body.name)
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

getCategoryUsers = async (req, res) => {
    let category = req.params.category;
    settingsModel.retrieveByCategory(category).then((data) => {
        res.status(200).json(data.rows);
    }).catch(err => res.status(500).json({
        message: "Error 500 Internal Server Error: " + err.message
    }));
}

changeUserCategory = async (req, res) => {
    let category = req.body.category;
    let user_id = req.params.id;
    settingsModel.changeCategory(user_id, category).then((data) => {
        res.status(200).json('Category changed to ' + req.body.category)
    }).catch(err => res.status(500).json({
        message: "Error 500 internal Server error: " + err.message
    }))
}

module.exports = {
    createSetting,
    getUserSettings,
    changePricing,
    changeContentSettings,
    changeProfilePicture,
    changeUserHeader,
    changeUserBackground,
    changeCommissionStatus,
    changeUserName,
    getUniqueCategories,
    getCategoryUsers,
    changeUserCategory
}