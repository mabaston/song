const { verifyToken } = require('../utils/jwt-helper');
const { getUserRoleByUserId } = require('../repositories/users-repositories');

const verifyTokenHandler = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (token && token.includes('Bearer')) {

    try {
        const result = await verifyToken(token);

        if (result && result.valid) {
            req.userDatas = result.userDatas;

            return next();
        }

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }

    } else return res.status(401).json({ message: "Token not provided!" });
}

const verifyRoles = (roles) => {
    return async (req, res, next) => {
        const userRoles = await getUserRoleByUserId(req.userDatas.id);

        let haveRole = false;

        userRoles.forEach(userRoles => haveRole = userRoles.name.includes(roles));

        haveRole ? next() : res.status(403).json({ success: false, message: "Access to this session is denied by the server." });
    }
}

module.exports = { verifyTokenHandler, verifyRoles };