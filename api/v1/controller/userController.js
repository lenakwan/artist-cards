const userModel = require('../model/userModel');

/**
 * Registers a user on the application. Check if user exists in the database, 
 * if it does then it sends a message that the user exists. If not, a new user is created. Username is unique.
 * 
 */
registerUser = async (req, res) => {
    let body = req.body;
    userModel.searchUser(body.username).then((users) => {
        if (users.rowCount == 0) {
            userModel.createUser(body.username, body.password).catch(err => res.status(500).json({
                message: "Error 500 Internal Server Error: " + err.message
            }))
            res.status(200).json('User added to the Database');
        } else {
            res.status(409).json('User already exists in the Database');
        }
    })
}

/**
 * Authenticates the user and by checking if the Username and Password combination exists in the database.
 */
loginUser = async (req, res) => {
    let body = req.body;
    userModel.authenticateUser(body.username, body.password).then((users) => {
        if (users.rowCount == 1) {
            res.status(200).json(users.rows);
        } else {
            res.status(404).json('User not Found.')
        }
    }).catch(e => res.status(500).json({
        message: 'Error 500 Internal Server Error: ' + e.message
    }));
}

searchUser = async (req, res) => {
    let user_name = req.params.username;
    userModel.searchUserId(user_name).then((users) => {
        if (users.rowCount == 1) {
            res.status(200).json(users.rows);
        } else {
            res.status(404).json('User Not Found');
        }
    })
}

searchUserCategory = async (req, res) => {
    let category = req.params.category;
    userModel.searchUserByCategory(category).then((users) => {
        if (users.rowCount == 1) {
            res.status(200).json(users.rows);
        } else {
            res.status(404).json('User Not Found');
        }
    })
}
module.exports = {
    registerUser,
    loginUser,
    searchUser,
    searchUserByCategory
}