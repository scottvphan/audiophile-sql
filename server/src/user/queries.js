const getUsers = "SELECT * FROM users";
const getUserId = "SELECT * from users WHERE email = $1 "
const getUserById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailsExist = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (name, email) VALUES($1, $2)";

module.exports = {
    getUsers,
    getUserId,
    getUserById,
    checkEmailsExist,
    addUser,
};