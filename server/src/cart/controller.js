const pool = require("../../db");
const queries = require("./queries")

const getCartById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCartById, [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            if (!results.rows.length) {
                res.status(200).json({})
                console.log('sending empty cart')
            } else {
                const cartData = results.rows[0].cart_items
                res.status(200).send(cartData);
                console.log('sending cart')
            }
        }
    })
}
const getCart = (req, res) => {
    pool.query('SELECT * FROM carts', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const addCart = (req, res) => {
    const user_id = req.body.userId;
    if (user_id !== 0) {
        pool.query(queries.checkUserIdExist, [user_id], (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length) {
                res.send("Cart already exists.");
            } else {
                pool.query(queries.addCart, [user_id], (error, results) => {
                    if (error) {
                        console.error("Error adding cart:", error);
                        res.status(500).send("Error adding cart");
                    } else {
                        res.status(201).send("Cart Created Successfully!");
                        console.log("Cart created");
                    }
                });
            }
        });
    } else {
        res.status(500).send("Missing user_id")
    }
};

const addCartItems = (req, res) => {
    const user_id = req.body.userId;
    const cartData = req.body.cartData;
    console.log('adding cart items')
    console.log(cartData)
    pool.query(queries.checkUserIdExist, [user_id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length) {
            pool.query(queries.updateCart, [user_id, cartData], (error, results) => {
                if (error) {
                    throw error
                }
                res.send('updated cart')
                console.log('updating cart')
            })
        } else {
            res.status(401).send('User does not exist');
        }
    })
}


module.exports = {
    getCartById,
    addCart,
    getCart,
    addCartItems,
};