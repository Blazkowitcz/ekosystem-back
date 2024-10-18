const SystemService = require('@services/system.service');
const { SensorUtil } = require('@utils/sensor.util');
const { EVENTS } = require('../../constants')
const  ping = require('ping');

/**
 * Get all Systems
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.getSystems = async (req, res) => {
    try {
        const systems = await SystemService.getSystems();
        const result = await Promise.all(systems.map(async (system) => ({
            ...system.toJSON(),
            alive: (await ping.promise.probe(system.toJSON().ip)).alive,
            sensorConnected: system.port ? await SensorUtil.pingPort(system.ip, system.port) : false
        })));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message || 'An error occurred' });
    }
}

/**
 * Get System detail
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.getSystemDetails = async (req, res) => {
    try{
        const system = await SystemService.getSystem(req.params.id);
        let result = {...system.toJSON()}
        result.processes = await Promise.all(
            result.processes.map(async (process) => ({
                ...process,
                alive: await SensorUtil.pingPort(result.ip, process.port),
            }))
        );
        try{
            const details = await SensorUtil.getSystemDetail(system.ip, system.port, system.sensorKey, EVENTS.GLOBAL);
            result = {...result, ...details}
        }catch(error){
            console.log(error)
        }
        return res.status(200).json(result)
    }catch(error){
        return res.status(500).json({message: error});
    }
}

/**
 * Add a new System
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.addSystem = async (req, res) => {
    try{
        const system = await SystemService.addSystem(req.body);
        return res.status(200).json(system)
    }catch(error){
        return res.status(500).json({message: error});
    }
}