var Humedad = require('../models/Humedad');

//función para obtener la temperatura de la zona norte
exports.getHumedad = async function (req, res, next) {
    try {
        var humedad = await Humedad.find({});
        console.log(humedad);
        res.json(humedad);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
