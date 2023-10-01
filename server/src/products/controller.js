const pool = require("../../db");
const queries = require("./queries")

const getProducts = (req, res) => {
    console.log('calling');
    pool.query(queries.getProducts, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results.rows);
        }
    });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getProductById, [id], (error, results) => {
        if(error){
            throw error
        } else {
            res.status(200).json(results.rows)
        }
    })
}

module.exports = {
    getProducts,
    getProductById,
};