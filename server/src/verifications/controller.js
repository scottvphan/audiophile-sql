const pool = require("../../db");
const queries = require("./queries");
const axios = require("axios");

// Gets Auth Token
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

const getVerificationId = async (req, res) => {
    updateVerificationSent()
    pool.query(queries.getVerificationId, async (error, results) => {
        if (error) {
            throw error
        } else {
            if (results.rows.length) {
                res.status(200).json(results.rows)
            } else {
                res.status(404).send('No results found')
            }
        }
    })
}

const getVerificationById = async (req, res) => {
    updateVerificationSent()
    const user_id = req.params.id;

    pool.query(queries.checkVerificationExists, [user_id], async (error, results) => {
        if (error) {
            throw error;
        } else {
            pool.query(queries.updateExpiredTokens, (error) => {
                if (error) {
                    throw error;
                } else {
                    pool.query(queries.updateExpiredEmail, (error) => {
                        if (error) {
                            throw error;
                        } else {
                            pool.query(queries.getVerificationById, [user_id], async (error, results) => {
                                if (error) {
                                    throw error;
                                } else {
                                    if (results.rows.length) {
                                        res.status(200).json(results.rows[0])
                                    } else {
                                        res.status(404).send("The token either expired or does not exist")
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

const addVerification = (req, res) => {
    console.log('checking verification');
    const user_id = req.body.user_id;
    pool.query(queries.checkVerificationExists, [user_id], async (error, results) => {
        if (error) {
            throw error;
        } else {
            if (results.rows.length) {
                res.send("User already exists")
            } else {
                pool.query(queries.checkIsVerificationExpired, [user_id], async (error, results) => {
                    if (error) {
                        throw error;
                    } else {
                        // Updates tokens to expired after one hour
                        pool.query(queries.updateExpiredEmail, async (error, results) => {
                            console.log('updating')
                            if (error) {
                                throw error;
                            } else {
                                if (results.rows.length) {
                                    res.status(202).send("Current email has not expired yet")
                                } else {
                                    pool.query(queries.addVerification, [user_id], async (error, results) => {
                                        if (error) {
                                            throw error;
                                        } else {
                                            res.status(200).send('Added user verification and token')
                                            console.log('adding user')
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}

const updateVerificationSent = () => {
    pool.query(queries.updateExpiredEmail, (error) => {
        if (error) {
            throw error
        }
    })
}

const deleteVerificationById = (req, res) => {
    const user_id = req.params
    pool.query(queries.checkVerificationExists, async (error, results) => {
        if (error) {
            throw error
        } else {
            if (!results.rows.length) {
                res.status(404).send("user does not exist")
            } else {
                pool.query(queries.deleteVerificationById, async (error, results) => {
                    if (error) {
                        throw error
                    } else {
                        res.status(200).send("Successfully deleted user verification");
                    }
                })
            }
        }
    })
}

const updateEmailDate = (req, res) => {
    const user_id = req.body.user_id;
    const date = new Date();
    const timestamp = date.toISOString();

    pool.query(queries.updateExpiredEmailsSent, (error, results) => {
        if (error) {
            throw error;
        } else {
            pool.query(queries.updateEmailDate, [user_id, timestamp], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.status(200).send('Successfully updated email date')
                }
            })
        }
    })
}


// const updateTokenDate = (req, res) => {
//     const user_id = req.body.user_id;
//     pool.query(queries.updateExpiredTokens, (error, results) => {
//         if (error) {
//             throw error;
//         } else {
//             const date = new Date();
//             const timestamp = date.toISOString()
//             pool.query(queries.updateTokenDate, [user_id, timestamp], (error, results) => {
//                 if (error) {
//                     throw error;
//                 } else {
//                     res.status(200).send('Successfully updated token date')
//                 }
//             })
//         }
//     })
// }

const updateTokenDate = (user_id) => {
    const date = new Date();
    const timestamp = date.toISOString()
    pool.query(queries.updateTokenDate, [user_id, timestamp], (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log('updated token timestamp')
        }
    })
}


const createToken = (req, res) => {
    const user_id = req.body.user_id;
    pool.query(queries.updateExpiredTokens, async (error, results) => {
        if (error) {
            throw error;
        } else {
            pool.query(queries.checkForExpiredTokens, [user_id], async (error, results) => {
                if (error) {
                    throw error;
                } else {
                    if (results.rows.length) {
                        res.send("Token has not expired yet")
                    } else {
                        const token = await getVerificationToken()
                        pool.query(queries.updateToken, [user_id, token], async (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                res.status(200).send("Successfully created a token");
                                console.log('created token')
                                updateTokenDate(user_id)
                            }
                        })
                    }
                }
            })
        }
    })
}

const sendEmail = (req, res) => {
    const userData = req.body;
    const userEmail = userData.email;
    const authToken = userData.authToken;
    const user_id = userData.user_id
    const options = {
        method: "GET",
        url: "https://dev-g4y2r5dknwja6vmn.us.auth0.com/api/v2/users-by-email",
        params: { email: userEmail },
        headers: {
            authorization: `Bearer ${authToken}`,
        },
    };
    pool.query(queries.updateExpiredEmail, (error, results) => {
        if (error) {
            throw error;
        } else {
            pool.query(queries.checkIsVerificationExpired, [user_id], (error, results) => {
                if (results.rows.length) {
                    res.status(200).send("Verification email has not expired yet")
                } else {
                    axios.request(options)
                        .then(async (response) => {
                            const userData = {
                                auth0: response.data[0],
                                userEmail: userEmail,
                                authToken: authToken,
                            };

                            // Gets the auth 0 user_id
                            const userId = response.data[0].user_id
                            const emailOptions = {
                                method: "POST",
                                url: "https://dev-g4y2r5dknwja6vmn.us.auth0.com/api/v2/jobs/verification-email",
                                headers: {
                                    authorization: `Bearer ${authToken}`,
                                    "Content-Type": "application/json",
                                },
                                data: {
                                    user_id: userId,
                                    client_id: process.env.CLIENT_ID,
                                    identity: {
                                        user_id: userData.auth0.identities[0].user_id,
                                        provider: userData.auth0.identities[0].provider,
                                    },
                                },
                            };
                            // Sends the verification email
                            await axios.request(emailOptions)

                            // Updates the verification sent timestamp
                            const date = new Date();
                            const timestamp = date.toISOString()
                            pool.query(queries.updateEmailDate, [user_id, timestamp], (error) => {
                                console.log('updated email date')
                                if (error) {
                                    throw error;
                                }
                            })
                            pool.query(queries.updateSentEmail, [ user_id ], (error) => {
                                if (error) {
                                    throw error;
                                }
                            })
                            res.status(200).send("Verification email sent")
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
            })
        }
    })
};


module.exports = {
    getVerificationById,
    addVerification,
    getVerificationId,
    deleteVerificationById,
    updateEmailDate,
    updateTokenDate,
    createToken,
    sendEmail,
}

