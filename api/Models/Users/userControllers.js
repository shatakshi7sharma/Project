
const User = require("./users")
const bcrypt = require('bcryptjs')
const UserControllerHelper = require('./UserControllerHelper')

var signup = async (req, h) => {
    const { firstName, lastName, email, password } = req.payload;

    try {
        const user = new User({ firstName, lastName, email, password });
        await user.save();

        const accessToken = UserControllerHelper.generateAccessToken(user);

         
        h.send({ accessToken, userId: user._id });
    } catch (error) {
        return UserControllerHelper.getFaliure("error from server", error)
    }

}



var login = async (req, h) => {

    const { email, password } = req.payload;

    if (!email || !password) {
        return { error: "Must provide email and password" }
    }

    const user = await User.findOne({ email });

    if (!user) {
        return { error: "Invalid email or password" }
    }

    try {
        await user.comparePassword(password);

        const accessToken = await UserControllerHelper.generateAccessToken(user._id);

        return { accessToken, userId: user._id };

    } catch (err) {
        return UserControllerHelper.getFaliure("error from server", error)
    }
}

module.exports = {

    signup,
    login
}