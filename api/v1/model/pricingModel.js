const db = require('../db');

addPrice = (id, itemName, price) =>{
    return db.pool.query({
        text: "INSERT INTO pricing(id, item_name, item_price) VALUES($1, $2, $3)",
        values: [id, itemName, price]
    })
}

getPrices = (id) =>{
    return db.pool.query({
        text: "SELECT * from pricing where id = $1",
        values: [id]
    })
}

editPrice = (id, itemName, newPrice) => {
    return db.pool.query({
        text:"UPDATE pricing SET item_price = $3 WHERE id=$1, AND item_name = $2",
        values: [id, itemName, newPrice]
    })
}

deletePrice = (id, itemName) =>{
    return db.pool.query({
        text: "DELETE FROM pricing WHERE id = $1 AND item_name=$2",
        values: [id, itemName]
    })
}

deleteAllPrices = (id) =>{
    return db.pool.query({
        text: "DELETE FROM pricing WHERE id = $1",
        values: [id]
    })
}

module.exports = {
    deleteAllPrices, deletePrice, editPrice, getPrices, addPrice
}