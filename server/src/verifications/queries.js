const getVerificationById = "SELECT * FROM verifications WHERE user_id = $1 AND is_verification_expired = false";
const addVerification = "INSERT INTO verifications (user_id, token, is_verification_expired, is_verification_sent, is_token_expired) VALUES ($1, NULL, false, false, false)";
const updateExpiredEmailsSent = "UPDATE verifications SET is_verification_sent = false WHERE verification_email_date < NOW() - INTERVAL '24 hour'";
const updateExpiredEmail = "UPDATE verifications SET is_verification_expired = true WHERE verification_email_date < NOW() - INTERVAL '24 hour' AND is_verification_sent = false";
const updateSentEmail = "UPDATE verifications SET is_verification_sent = true WHERE user_id = $1";
const deleteExpiredToken = "DELETE FROM verifications WHERE verification_email_date < NOW() - INTERVAL '24 hour'";
const checkIsVerificationExpired = "SELECT * FROM verifications WHERE user_id = $1 AND is_verification_expired = true";
const checkVerificationExists = "SELECT * FROM verifications WHERE user_id = $1";
const getTokenById = "SELECT token FROM verifications WHERE user_id = $1 AND is_verification_expired = false";
const updateExpiredTokens = "UPDATE verifications SET is_token_expired = true WHERE token_date < NOW() - INTERVAL '24 hour' "
const updateToken = "UPDATE verifications SET token = $2 WHERE user_id = $1"
const checkForExpiredTokens = "SELECT * FROM verifications WHERE user_id = $1 AND is_verification_expired = true"
const updateEmailDate = "UPDATE verifications SET verification_email_date = $2 WHERE user_id = $1"
const updateTokenDate = "UPDATE verifications SET token_date = $2 WHERE user_id = $1"

module.exports = {
    getVerificationById,
    addVerification,
    checkIsVerificationExpired,
    deleteExpiredToken,
    updateExpiredEmail,
    checkVerificationExists,
    updateExpiredEmailsSent,
    updateSentEmail,
    getTokenById,
    updateExpiredTokens,
    updateToken,
    checkForExpiredTokens,
    updateEmailDate,
    updateTokenDate,
};
