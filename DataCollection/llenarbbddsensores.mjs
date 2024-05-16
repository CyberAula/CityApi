/* hay una app online para hacer algo similar
https://json-generator.com/
*/
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

const dbname = "Datos";
faker.seed(123);
await mongoose.connect('mongodb://0.0.0.0/'+dbname, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const temperaturaSchema = new mongoose.Schema({ 
  sensor_id: Number,
  nombre_sensor: String,
  temp: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  humidity: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  fecha: Date
}, {
  versionKey: false
});

const Temperatura = mongoose.model('Temperatura', temperaturaSchema);

async function insertarMultiTemperatura() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      sensor_id: 1,
      nombre_sensor: "Temperatura + Humedad",
      temp: {
        value: faker.number.float({ min: -10, max: 40, precision: 0.01 })
      },
      humidity: {
        value: faker.number.float({ min: 0, max: 100, precision: 0.01 })
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return Temperatura.insertMany(multiDoc);
}

insertarMultiTemperatura()
 .then(v => {
   console.log("RESULTADO TEMPERATURA:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR", err);
   process.exit();
});

const estadoRailSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  commuter: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  fecha: Date
}, { versionKey: false });

const Rail = mongoose.model('Raile', estadoRailSchema);

async function insertarMultiEstadoRail() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    let value = faker.helpers.arrayElement([ '1', '2' ]);
    newDoc = { 
      sensor_id: 2,
      nombre_sensor: "Conmutador y Servomotor",
      commuter: {
        type: "Property",
        value: value
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return Rail.insertMany(multiDoc);
}

insertarMultiEstadoRail()
 .then(v => {
   console.log("RESULTADO ESTADO RAIL:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR ESTADO RAIL", err);
   process.exit();
});

