const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE product_id = $1";

module.exports = {
    getProducts,
    getProductById,
};