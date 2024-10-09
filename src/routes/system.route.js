module.exports = app => {
    const SystemController = require('@controllers/system.controller');

    app.get('/systems', SystemController.getSystems);
    app.post('/systems', SystemController.addSystem);
}