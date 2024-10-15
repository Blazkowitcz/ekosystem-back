const { EVENTS } = require('../../constants')
const io = require("socket.io-client");

const SensorUtil = {}

SensorUtil.getSystemDetail = (ip, port, key, event) => {
    return new Promise((resolve, reject) => {
        const socket = io(`http://${ip}:${port}`);
        
        // Émettre l'authentification
        socket.emit(EVENTS.AUTHENTICATE, key);

        // Écouter la réponse d'authentification
        socket.on(EVENTS.AUTHENTICATE, (success) => {
            if (success) {
                console.log("Connecté");
                
                // Demander des données après l'authentification
                socket.emit(event);

                // Écouter l'événement et retourner les données
                socket.on(event, (data) => {
                    console.log('Received data:', data);
                    resolve(data);  // Retourne les données via la Promise
                });
            } else {
                console.log('Authentication failed');
                reject('Authentication failed');
            }
        });

        // Gérer les erreurs de connexion
        socket.on('connect_error', (err) => {
            reject(err);
        });
    });
};

module.exports = { SensorUtil }