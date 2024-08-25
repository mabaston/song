const dotenv = require('dotenv');
dotenv.config({ path: '../config/config.env' });

var jwt = require('jsonwebtoken');

const getJWT = (userDatas) => jwt.sign(userDatas, process.env.JWT_PASSWORD);

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        const formattedToken = token.replace('Bearer ', '');

        jwt.verify(formattedToken, process.env.JWT_PASSWORD, (error, decoded) => {
            error ? reject({ valid: false, message: error.message }) : resolve({ valid: true, userDatas: decoded });
        });
    });
}

module.exports = { getJWT, verifyToken };