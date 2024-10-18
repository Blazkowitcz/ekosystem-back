require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('@services/user.service');

/**
 * Register a new user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {User}
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body
    try{
        let user = await UserService.getUserByEmail(email);
        if(user){
            return res.status(409).json({message: 'User already exist'});
        }
        const salt = await bcrypt.genSalt(10);
        user = await UserService.createUser({
            username,
            email,
            password: await bcrypt.hash(password, salt)
        });
        return res.status(200).json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}

/**
 * Log a user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JsonWebToken}
 */
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await UserService.getUserByEmail(email);
        if(!user){
            return res.status(400).json({message: 'Error during login'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: 'Error during login'});
        }
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600}, (error, token) => {
            if(error) throw error;
            res.status(200).json(token)
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
}
