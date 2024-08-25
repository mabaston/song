const getUserEmail = "SELECT * FROM users WHERE email = $1";
const createUser =  `INSERT INTO users(first_name, last_name, dob, address, place, city, district, state, email, password, phone)
                        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING *`;

const getUserRoleByUserId = "SELECT r.name FROM roles r INNER JOIN users_roles ur ON ur.roles_id = r.id WHERE ur.user_id = $1";

module.exports = { getUserEmail, createUser, getUserRoleByUserId };