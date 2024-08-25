const pool = require('../config/database');
const usersQueries = require('../queries/users-queries');
const { hashPassword } = require('../utils/password-helper');

const getUserEmail = (email) => new Promise((res, rej) => pool.query(usersQueries.getUserEmail, [email], (error, data) => error ? rej(error) : res(data.rows)));

const createUser = (first_name, last_name, dob, address, place, city, district, state, email, password, phone) => {
    return new Promise((res, rej) => {
        const hashedPassword = hashPassword(password);

        pool.query(usersQueries.createUser, [first_name, last_name, dob, address, place, city, district, state, email, hashedPassword, phone], (error, result) => {
            error ? rej(error) : res(result.rows);
        });
    });
}

const getUserRoleByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(usersQueries.getUserRoleByUserId, [userId], (error, data) => {
            error ? reject(error) : resolve(data.rows);
        });
    });
}

module.exports = { getUserEmail, createUser, getUserRoleByUserId };