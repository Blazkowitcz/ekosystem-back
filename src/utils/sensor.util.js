const { EVENTS } = require('../../constants')
const io = require("socket.io-client");
const net = require('net');

const SensorUtil = {}

/**
 * Get details from sensor
 * @param {String} ip 
 * @param {Integer} port 
 * @param {String} key 
 * @param {EVENTS} event 
 * @returns 
 */
SensorUtil.getSystemDetail = (ip, port, key, event) => {
    return new Promise((resolve, reject) => {
        const socket = io(`http://${ip}:${port}`);
        socket.emit(EVENTS.AUTHENTICATE, key);
        socket.on(EVENTS.AUTHENTICATE, (success) => {
            if (success) {
                socket.emit(event);
                socket.on(event, (data) => {
                    resolve(data);
                });
            } else {
                reject('Authentication failed');
            }
        });
        socket.on('connect_error', (err) => {
            reject(err);
        });
    });
};

/**
 * Ping address:port to check if its available
 * @param {String} ip 
 * @param {Integer} port 
 * @returns {Boolean}
 */
SensorUtil.pingPort = (ip, port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);
        socket.on('connect', function () {
            resolve(true);
        }).on('error', function () {
            resolve(false);
        }).on('timeout', function () {
            resolve(false);
        }).connect(port, ip)
    });
}

module.exports = { SensorUtil }