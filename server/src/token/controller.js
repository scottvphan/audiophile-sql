const pool = require("../../db");
const queries = require("./queries")

const getVerificationToken = async () => {
    const options = {
        method: 'POST',
        url: 'https://dev-g4y2r5dknwja6vmn.us.auth0.com/oauth/token',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            client_id: 'sDgeKBnHtQNUWpf8atarxYXKdefP5jsV',
            client_secret: 'Fv-v42oZoAGfsGt1mmztmqgnpSXqVIka_5-3uLrh1nScWpBlTDYjaTmdaOVtn9RS',
            audience: 'https://dev-g4y2r5dknwja6vmn.us.auth0.com/api/v2/',
            grant_type: 'client_credentials',
        },
    };

    try {
        const response = await axios(options);
        const token = response.data.access_token;
        return token;
    } catch (error) {
        throw error;
    }
}

const getTokenById = (req, res) => {
    const id = req.params

    pool.query(queries.getTokenById, [ id ], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results.rows);
        }
    });
};

const addToken = (req, res) => {
    console.log('adding token');
    const userData = req.body
    pool.query(queries.updateExpiredTokens, (error, results) => {
        if (error) {
            throw error;
        } else {
            pool.query(queries.checkForExpiredTokens, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    if (results.rows.length) {
                        res.send('Previous token has not expired yet')
                    } else {
                        const token = getVerificationToken()
                        const verification_id = userData.verification_id
                        const user_id = userData.user_id
                        pool.query(queries.addTokens, [ verification_id, token, user_id ], (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                res.status(201).send('Successfully saved token')
                            }
                        })
                    }
                }
            })
        }
    })
}

const deleteExpiredToken = async (req, res) => {
    pool.query(queries.checkForExpiredTokens, [user_id], async (error, results) => {
        if(error) {
            throw error;
        } else {
            pool.query(queries.deleteExpiredTokens, [user_id], async (error, results) => {
                if(error) {
                    throw error;
                } else {
                    res.status(201).send("Successfully deleted token")
                }
            })
        }
    })
}

module.exports = {
    getTokenById,
    addToken,
    deleteExpiredToken,
}