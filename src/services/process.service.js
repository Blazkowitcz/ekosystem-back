const { Process } = require('@models/process.model')

/**
 * Get all Processes
 * @returns {Process[]}
 */
exports.getProcesses = async() => {
    return await Process.findAll();
}

/**
 * Get Process by its UUID
 * @param {UUID} id 
 * @returns {Process}
 */
exports.getProcess = async(id) => {
    return await Process.findByPk(id);
}

/**
 * Add a new Process
 * @param {Object} data 
 * @returns {Process}
 */
exports.addProcess = async(data) => {
    const process = await Process.create(data);
    return process;
}