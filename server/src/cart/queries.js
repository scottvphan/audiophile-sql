const getCartById = "SELECT cart_items FROM carts WHERE user_id = $1";
const checkUserIdExist = "SELECT * FROM carts WHERE user_id = $1";
const addCart = "INSERT INTO carts (user_id) VALUES($1)";
const updateCart = "UPDATE carts SET cart_items = $2 WHERE user_id = $1";

module.exports = {
    getCartById,
    checkUserIdExist,
    addCart,
    updateCart,
};