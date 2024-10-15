module.exports = app => {
    const SystemController = require('@controllers/system.controller');

    /**
     * GET
     */
    app.get('/systems', SystemController.getSystems);
    app.get('/systems/:id/details', SystemController.getSystemDetails)
    
    /**
     * POST
     */
    app.post('/systems', SystemController.addSystem);
}