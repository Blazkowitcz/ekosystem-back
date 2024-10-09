const { User } = require('@models/user.model');

/**
 * Get user by its email
 * @param {String} email 
 * @returns {User}
 */
exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

/**
 * Create new user
 * @param {Object} data 
 * @returns {User}
 */
exports.createUser = async (data) => {
    const user = User.create({
        username: data.username,
        email: data.email,
        password: data.password
    });
    return await user;
}