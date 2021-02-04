const db = require('../db');

addLink= (id, link_name, link_url) =>{
    return db.pool.query({
        text: "INSERT INTO links(id, link_name, link_url) VALUES($1, $2, $3)",
        values: [id, link_name, link_url]
    })
}

deleteLink = (id, link_name)=>{
    return db.pool.query({
        text: "DELETE FROM links WHERE id = $1 AND link_name = $2",
        values: [id, link_name]
    })
}

