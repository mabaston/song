const usersRepositories = require('../repositories/users-repositories');
const CustomError = require('../utils/custom-error')
const asyncHandler = require('../middlewares/async-handler');
const { getJWT } = require('../utils/jwt-helper');
const { comparePassword } = require('../utils/password-helper');

const createUser = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, dob, address, place, city, district, state, email, password, phone } = req.body;

    const result = await usersRepositories.getUserEmail(email);

    if (result && result.length > 0) return next(new CustomError("Email already exists!", 409));

    const userDatas = await usersRepositories.createUser(first_name, last_name, dob, address, place, city, district, state, email, password, phone);

    if (userDatas && userDatas.length > 0) {
        const token = getJWT(userDatas[0]);

        return res.status(201).json({ success: true, message: "Successfully created new account!", token: token });

    } else next(new CustomError('User data is empty!'));
});



const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const userDatas = await usersRepositories.getUserEmail(email);

    if (userDatas && userDatas.length > 0) {
        const validPassword = comparePassword(password, userDatas[0].password);

        if (validPassword) {
            const token = getJWT(userDatas[0]);

            res.status(200).json({
                success: true,
                message: "Successfully login!",
                user: userDatas[0],
                token: token
            });

        } else return next(new CustomError("Invalid credentials!", 403));

    } else return next(new CustomError("Invalid credentials!", 403));
});


module.exports = { createUser, loginUser };