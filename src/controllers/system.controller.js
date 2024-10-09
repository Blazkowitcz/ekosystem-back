const SystemService = require('@services/system.service');

exports.getSystems = async (req, res) => {
    try{
        const systems = await SystemService.getSystems();
        return res.status(200).json(systems)
    }catch(error){
        
        return res.status(500).json({message: error});
    }
}

exports.addSystem = async (req, res) => {
    try{
        const system = await SystemService.addSystem(req.body);
        return res.status(200).json(system)
    }catch(error){
        
        return res.status(500).json({message: error});
    }
}