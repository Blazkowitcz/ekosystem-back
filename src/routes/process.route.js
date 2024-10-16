module.exports = app => {
    const ProcessController = require('@controllers/process.controller');

    /**
     * GET
     */
    app.get('/processes', ProcessController.getProcesses);

    
    /**
     * POST
     */
    app.post('/processes', ProcessController.addProcess);
}