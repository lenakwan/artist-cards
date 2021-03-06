const linkModel = require('../model/linkModel');

addUserLink = async (req, res) => {
    let body = req.body;
    linkModel.addLink(body.id, body.link_name, body.link_url).then((data) => {
        res.status(200).json('Link Added')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

deleteUserLink = async (req, res) => {
    let user_id = req.params.id;
    let body = req.body;
    linkModel.deleteLink(user_id, body.link_name).then((data) => {
        res.status(200).json('Link Deleted')
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}

getUserLinks =async (req,res) =>{
    let user_id = req.params.id;
    linkModel.getLinks(user_id).then((data) => {
        res.status(200).json(data.rows)
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }))
}
module.exports = {
    addUserLink,
    deleteUserLink,
    getUserLinks
}