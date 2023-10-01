const pool = require("../../db");
const queries = require("./queries")

const getUsers = (req, res) => {
    console.log('calling');
    
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results.rows);
        }
    });
};

const getUserId = (req, res) => {
    const email = req.params.email
    
    pool.query(queries.getUserId, [email], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results.rows)
        }
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error){
            throw error
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const addUser = (req, res) => {
    const { name, email } = req.body
    pool.query(queries.checkEmailsExist, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists.");
        } else{
            pool.query(queries.addUser, [name, email], (error, results) => {
                if(error){
                    throw error
                } else {
                    res.status(201).send("User Created Successfully!")
                    console.log("User created")
                }
            })
        }
    })
}

module.exports = {
    getUsers,
    getUserId,
    getUserById,
    addUser,
};