const { System } = require('@models/system.model')

/**
 * Get all Systems
 * @returns {System[]}
 */
exports.getSystems = async() => {
    return await System.findAll();
}

/**
 * Get System by its UUID
 * @param {UUID} id 
 * @returns {System}
 */
exports.getSystem = async(id) => {
    return await System.scope('processes').findByPk(id);
}

/**
 * Add a new System
 * @param {Object} data 
 * @returns {System}
 */
exports.addSystem = async(data) => {
    const system = await System.create(data);
    return system;
}

