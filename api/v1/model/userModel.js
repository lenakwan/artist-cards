const db = require('../db');

/** 
 * Searches for the specified user in the database.
 * 
 * @param {string} username unique username
 */
searchUser = (username) => {
    return db.pool.query({
        text: "Select * from users where username = $1",
        values: [username]
    });
}
/**
 * Checks if the username and password combination returns a user in the database.
 * 
 * @param {string} username unique username
 * @param {string} password user password
 */
authenticateUser = (username, password) => {
    return db.pool.query({
        text: "Select * from users where username = $1 AND password = $2",
        values: [username, password]
    });
}
/**
 * Creates a user in the database.
 * 
 * @param {string} username username must be unique maxchar set to 40
 * @param {string} password password maxchar set to 40
 */
createUser = (username, password) => {
    return db.pool.query({
        text: "INSERT INTO users (username, password, id) VALUES ($1, $2, nextval('users_id_seq'))",
        values: [username, password]
    });
}

/** 
 * Searches for the specified user in the database.
 * 
 * @param {string} username unique username
 */
searchUserId = (username) => {
    return db.pool.query({
        text: "Select id from users where username = $1",
        values: [username]
    });
}

/** 
 * Searches for the specified user in the database based on their category.
 * 
 * @param {string} category user category from user_settings
 */
searchUserByCategory = (category) => {
    return db.pool.query({
        text: "SELECT username FROM users LEFT JOIN user_settings ON users.id = user_settings.id WHERE category = $1",
        values: [category]
    });
}

module.exports = {
    searchUser,
    authenticateUser,
    createUser,
    searchUserId,
    searchUserByCategory
}