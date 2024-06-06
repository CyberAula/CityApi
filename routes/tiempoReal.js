var express = require('express');
var router = express.Router();
var axios = require('axios');

const sensorValueProperties = {
    'https://uri.fiware.org/ns/data-models#TemperatureSensor': 'https://w3id.org/saref#temperature',
    'https://uri.fiware.org/ns/data-models#HumiditySensor': 'https://w3id.org/saref#Humidity',
    'https://uri.fiware.org/ns/data-models#Servmotor': 'https://uri.fiware.org/ns/data-models#stateMotor',
    'https://uri.etsi.org/ngsi-ld/default-context/UltrasoundSensor': 'https://uri.fiware.org/ns/data-models#distance',
    'https://uri.fiware.org/ns/data-models#PhotoresistorSensor': 'https://uri.etsi.org/ngsi-ld/default-context/light',
    'https://uri.fiware.org/ns/data-models#PirSensor': 'https://w3id.org/saref#Occupancy',
    'https://uri.fiware.org/ns/data-models#PotentiometerSensor': 'https://w3id.org/saref#LevelControlFunction',
    'https://uri.fiware.org/ns/data-models#InfraredSensor': 'https://w3id.org/saref#Occupancy',
    'https://uri.fiware.org/ns/data-models#SwitchSensor': 'https://w3id.org/saref#OnOffState',
    'https://uri.fiware.org/ns/data-models#RfidSensor': 'https://schema.org/leiCode',
    'https://uri.fiware.org/ns/data-models#LedDetection': 'https://uri.fiware.org/ns/data-models#stateLed',
    'https://uri.fiware.org/ns/data-models#Light': 'https://uri.fiware.org/ns/data-models#stateLight',
    'https://uri.fiware.org/ns/data-models#EngineDC': 'https://uri.fiware.org/ns/data-models#velocityEngine',
    'https://uri.fiware.org/ns/data-models#Camera': 'https://uri.fiware.org/ns/data-models#on'
};

//obtención de datos en tiempo real del Context Broker
async function obtenerDatoEnTiempoReal(numid) {
    let nombre;
    let urn;
    let unidad;
    switch (numid) {
        case '1':
            urn = "urn:ngsi-ld:TemperatureSensor:001";
            nombre = "sensor de temperatura";
            unidad = "°C";
            break;
        case '2':
            urn = "urn:ngsi-ld:HumiditySensor:001";
            nombre = "sensor de humedad";
            unidad = "%";
            break;
        case '3':
            urn = "urn:ngsi-ld:Servmotor:001";
            nombre = "sensor servomotor";
            unidad = "";
            break;
        case '4':
            urn = "urn:ngsi-ld:UltrasoundSensor:001";
            nombre = "sensor de ultrasonido";
            unidad = "cm";
            break;
        case '5':
            urn = "urn:ngsi-ld:PhotoresistorSensor:001";
            nombre = "sensor de fotorresistor";
            unidad = "";
            break;
        case '6':
            urn = "urn:ngsi-ld:PirSensor:001";
            nombre = "sensor de PIR";
            unidad = "";
            break;
        case '7':
            urn = "urn:ngsi-ld:PotentiometerSensor:001";
            nombre = "sensor potenciómetro";
            unidad = "";
            break;
        case '8':
            urn = "urn:ngsi-ld:InfraredSensor:002";
            nombre = "sensor de infrarrojo";
            unidad = "";
            break;
        case '9':
            urn = "urn:ngsi-ld:SwitchSensor:001";
            nombre = "sensor switch";
            unidad = "";
            break;
        case '10':
            urn = "urn:ngsi-ld:RfidSensor:001";
            nombre = "sensor de RFID";
            unidad = "";
            break;
        case '11':
            urn = "urn:ngsi-ld:LedDetection:001";
            nombre = "sensor de detección de LED";
            unidad = "";
            break;
        case '12':
            urn = "urn:ngsi-ld:Light:001";
            nombre = "sensor de luz";
            unidad = "";
            break;
        case '13':
            urn = "urn:ngsi-ld:EngineDC:001";
            nombre = "sensor motor DC";
            unidad = "";
            break;
        case '14':
            urn = "urn:ngsi-ld:Camera:001";
            nombre = "sensor de cámara";
            unidad = "";
            break;
        default:
            return '¡Este índice no corresponde a ningún sensor!';
    }

    try {
        const response = await axios.get(`http://localhost:1026/v2/entities/${urn}`);
        // Opción 1: Se obtiene el objeto completo en tiempo real
        return response.data;
        /* Opción 2: Se obtiene solo el nombre y el valor del sensor en tiempo real
        const data = response.data;
        const sensorType = data.type;
        const valueProperty = sensorValueProperties[sensorType];
        const valor = data[valueProperty].value;
        return `Este es el ${nombre}, valor actual: ${valor} ${unidad}`;*/
    } catch (error) {
        console.error(error);
        return 'Hubo un error al obtener los datos del sensor.';
    }
}

//ruta para obtener datos en tiempo real
router.get('/tiempoReal/sensores/:numid', async (req, res) => {
    const numid = req.params.numid;
    const dato = await obtenerDatoEnTiempoReal(numid);
    if (dato) {
        res.json(dato);
    } else {
        res.status(400).send('¡Este índice no corresponde a ningún sensor!');
    }
});

module.exports = router;