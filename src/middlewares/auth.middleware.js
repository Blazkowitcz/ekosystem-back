const jwt = require('jsonwebtoken');

/**
 * Check token sent by user for authorization
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */
exports.checkToken = function (req, res, next) {
    const token = req.header('token');
    if(!token) {
        return res.status(401).json({message: 'Auth Error'});
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch(error){
        res.status(401).json({message: 'Invalid Token'});
    }
}