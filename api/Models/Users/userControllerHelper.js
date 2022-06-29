const jwt = require('jsonwebtoken');
const passwordStrength = require('check-password-strength');
const Boom = require('@hapi/boom');
const User = require("./users")
// const User = require('../../Models').Users;



var getTokenFromHeader = (req) => {
    const { authorization } = req.headers;

    if (!authorization) {
        const error = Boom.unauthorized("You must be logged in");
        return { error: error.output };
    }
    const token = authorization.replace('Bearer ', '');
    return token;
}




var generateAccessToken = (userId) => {
    console.log("generateAccessToken----->>", userId)
    return jwt.sign({ userId: userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '8h' });
}

function getFaliure(message, error) {
    return { statusCode: 400, message: message, }
}

function returnSuccess(message, data) {
    return {
        statusCode: 200,
        message: message,
        data


    }
}


module.exports = {
    'getTokenFromHeader': getTokenFromHeader,
    'generateAccessToken': generateAccessToken,
    "getFaliure": getFaliure,
    "returnSuccess": returnSuccess

}
