module.exports = app => {
    const AuthController = require('@controllers/auth.controller');

    app.post('/signup', AuthController.signup);
    app.post('/signin', AuthController.signin);
}