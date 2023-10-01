const getTokenById = "SELECT * FROM tokens WHERE user_id = $1 AND verification_id = $2 AND is_verification_expired = false";
const updateExpiredTokens = "UPDATE verifications SET is_token_expired = true WHERE token_date < NOW() - INTERVAL '24 hour' "
const addTokens = "INSERT INTO verifications (user_id, token, is_expired) VALUES($1, $2, false)"
const checkForExpiredTokens = "SELECT * FROM tokens WHERE user_id = $1 and verification_id = $2 and is_verification_expired = true"
const deleteExpiredTokens = "DELETE FROM tokens where is_verification_expired = true"

module.exports = {
    getTokenById,
    updateExpiredTokens,
    addTokens,
    checkForExpiredTokens,
    deleteExpiredTokens
};