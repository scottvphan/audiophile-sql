const getOrders = "SELECT * FROM orders";
const getOrderId = "SELECT * from orders WHERE email = $1 "
const getOrderById = "SELECT * FROM orders WHERE order_id = $1";
const checkOrderExists = "SELECT * FROM orders WHERE user_id = $1";
const addOrder = "INSERT INTO orders ( user_id, shipping_price, cart, name, email, tax, total) VALUES($1, $2, $3, $4, $5, $6, $7 )";
const removeOrderById = "DELETE FROM orders WHERE order_id = $1";

module.exports = {
    getOrders,
    getOrderId,
    getOrderById,
    checkOrderExists,
    addOrder,
    removeOrderById
};