const ProcessService = require('@services/process.service');

/**
 * Get all Processes
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getProcesses = async (req, res) => {
    try{
        const processes = await ProcessService.getProcesses();
        res.status(200).json(processes);
    }catch(error){
        res.status(500).json({message: error});
    }
}

/**
 * Add a new Process
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addProcess = async (req, res) => {
    try{
        const process = await ProcessService.addProcess(req.body);
        res.status(200).json(process);
    }catch(error){
        res.status(500).json({message: error});
    }
}

