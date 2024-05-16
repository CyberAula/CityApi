const tempController = require('../controllers/tempController');
const railController = require('../controllers/railController');
const ultrasonidoController = require('../controllers/ultrasonidoController');

exports.getCollection = async function(collectionName, sensor_id, queryParams) {
    let result;
    switch (collectionName) {
        case 'Hygrothermograph':
            if ((queryParams.propiedad == "temp") && queryParams.min && queryParams.max) {
                let min = parseFloat(queryParams.min);
                let max = parseFloat(queryParams.max);
                result = await tempController.getMinAndMaxTemp(sensor_id, min, max);
            }
            if ((queryParams.propiedad = "humidity") && queryParams.min && queryParams.max) {
                let min = parseFloat(queryParams.min);
                let max = parseFloat(queryParams.max);
                result = await tempController.getMinAndMaxHumidity(sensor_id, min, max);
            }
            break;
        case 'conmutador':
            if (queryParams.estado) {
                result = await railController.getEstadoRail(sensor_id, queryParams.estado);
            }
            break;
        case 'ultrasonido':
            if (queryParams.mayorque) {
                result = await ultrasonidoController.getMayorque(queryParams.mayorque);
            } else if (queryParams.menorque) {
                result = await ultrasonidoController.getMenorque(queryParams.menorque);
            } else {
                result = await ultrasonidoController.getIgualque(queryParams.igualque);
            }
            break;
        default:
            throw new Error('Nombre de colección desconocido');
    }
    return result;
}
