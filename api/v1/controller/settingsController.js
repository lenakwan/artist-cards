const settingsModel = require('../model/settingsModel');


// id, category, name, user_status, bg_img, bg_link, bg_color, header_bg_img, header_bg_link, header_bg_color, profile_img, content_color, pricing
createSetting = async (req, res) => {
    let body = req.body;
    settingsModel.createSetting(body.id, body.category, body.name, body.user_status, body.bg_img, body.bg_link,
        body.bg_color, body.header_bg_img, body.header_bg_link, body.header_bg_color, body.profile_img, body.content_color, body.pricing).catch(err => res.status(500).json({
        message: "Error 500 Internal Server Error: " + err.message
    }))
    res.status(200).json('User setting added to the Database');
}

module.exports = {
    createSetting
}