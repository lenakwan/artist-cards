const db = require('../db');

/**
 * Updates the category of the user.
 * 
 * @param {integer} id an user id
 * @param {string} category a string defining the user's category
 */
changeCategory = (id, category) => {
    return db.pool.query({
        text: "UPDATE user_settings SET category = $2 WHERE id = $1",
        values: [id, category]
    })
}


/**
 * Retrieves Unique Categories.
 * 
 */
retrieveUniqueCategories = () => {
    return db.pool.query({
        text: "SELECT DISTINCT category FROM user_settings"
    })
}

/**
 * Updates the user's display name. Does not affect the user's login.
 * 
 * @param {integer} id an user id
 * @param {string} name user display name
 */
changeDisplayName = (id, name) => {
    return db.pool.query({
        text: "UPDATE user_settings SET name = $2 WHERE id = $1",
        values: [id, name]
    })
}

/**
 * Updates the store user_status of the user.
 * 
 * @param {integer} id an user id
 * @param {boolean} user_status true/false indicates if the user's commissions are open
 */
changeStoreStatus = (id, user_status) => {
    return db.pool.query({
        text: "UPDATE user_settings SET status = $2 WHERE id = $1",
        values: [id, user_status]
    })
}

/**
 * Updates the background image and color of the user's page stored in the database.
 * 
 * @param {integer} id an user id
 * @param {boolean} user_status true or false indicating if user is using an image
 * @param {string} link url to website hosting image
 * @param {string} color hexadecimal color
 */
changeBackground = (id, user_status, link, color) => {
    return db.pool.query({
        text: "UPDATE user_settings SET bg_img = $2, bg_link = $3, bg_color=$4 WHERE id = $1",
        values: [id, user_status, link, color]
    })
}

/**
 * Updates the header image and color of the user's page stored in the database.
 * 
 * @param {integer} id an user id
 * @param {boolean} user_status true or false indicating the user is using an image
 * @param {string} link url to website hosting image
 * @param {string} color hexadecimal color
 */
changeHeader = (id, user_status, link, color) => {
    return db.pool.query({
        text: "UPDATE user_settings SET header_bg_img = $2, header_bg_link = $3, header_bg_color=$4 WHERE id = $1",
        values: [id, user_status, link, color]
    })
}

/**
 * Updates the Profile picture stored in the database.
 * 
 * @param {integer} id an user id
 * @param {string} text user image converted to a datauri
 */
changeProfile = (id, text) => {
    return db.pool.query({
        text: "UPDATE user_settings SET profile_img = $2 WHERE id = $1",
        values: [id, text]
    })
}

/**
 * Updates the user's content background-colour stored in the database.
 * 
 * @param {integer} id an user id
 * @param {string} colour string containing hex colour.
 */
changeContentColor = (id, color) => {
    return db.pool.query({
        text: "UPDATE user_settings SET content_color = $2 WHERE id = $1",
        values: [id, color]
    })
}

/**
 * Updates the database with whether the user's pricing should be displayed or not.
 * 
 * @param {integer} id an user id
 * @param {boolean} user_status true or false for displaying pricing on their page
 */
togglePricing = (id, user_status) => {
    return db.pool.query({
        text: "UPDATE user_settings SET pricing= $2 WHERE id = $1",
        values: [id, user_status]
    })
}

createSetting = (id, category, name, user_status, bg_img, bg_link, bg_color, header_bg_img, header_bg_link, header_bg_color, profile_img, content_color, pricing) => {
    return db.pool.query({
        text: "INSERT INTO user_settings (id, category, name, status, bg_img, bg_link, bg_color, header_bg_img, header_bg_link, header_bg_color, profile_img, content_color, pricing) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        values: [id, category, name, user_status, bg_img, bg_link, bg_color, header_bg_img, header_bg_link, header_bg_color, profile_img, content_color, pricing]
    });
}

retrieveSettings = (id) => {
    return db.pool.query({
        text: "SELECT * FROM user_settings WHERE id = $1",
        values: [id]
    });
}

module.exports = {
    createSetting,
    togglePricing,
    changeContentColor,
    changeProfile,
    changeHeader,
    changeBackground,
    changeStoreStatus,
    changeDisplayName,
    changeCategory,
    retrieveSettings,
    retrieveUniqueCategories
}