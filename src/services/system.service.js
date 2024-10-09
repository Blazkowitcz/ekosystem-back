const { System } = require('@models/system.model')

/**
 * 
 * @returns {System[]}
 */
exports.getSystems = async() => {
    return await System.findAll();
}

/**
 * 
 * @param {Object} data 
 * @returns {System}
 */
exports.addSystem = async(data) => {
    const system = await System.create(data);
    return system;
}

