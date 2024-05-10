/* hay una app online para hacer algo similar
https://json-generator.com/
*/
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

const dbname = "Sensores";
faker.seed(123);
await mongoose.connect('mongodb://0.0.0.0/'+dbname, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const temperatureSchema = new mongoose.Schema({ 
  sensor_name: String,
  temperature: Number,
  humidity: Number,
  date: Date
  }, {
     versionKey: false
});
 
const TemperaturaEste = mongoose.model('TemperaturaEste', temperatureSchema);

async function insertarMultiTemperaturaEste() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      sensor_name: "Sensor temperatura este",
      temperature: faker.number.float({ min: -20, max: 40, precision: 0.1}),
      humidity: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TemperaturaEste.insertMany(multiDoc);
}

insertarMultiTemperaturaEste()
 .then(v => {
  console.log("RESULTADO:", v);
  process.exit();
}).catch(err => {
  console.error("ERROR", err);
  process.exit();
});

const TemperaturaOeste = mongoose.model('TemperaturaOeste', temperatureSchema);

async function insertarMultiTemperaturaOeste() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      sensor_name: "Sensor temperatura oeste",
      temperature: faker.number.float({ min: -20, max: 40, precision: 0.1}),
      humidity: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TemperaturaOeste.insertMany(multiDoc);
}

insertarMultiTemperaturaOeste()
 .then(v => {
   console.log("RESULTADO:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR", err);
   process.exit();
});

const VientoSchema = new mongoose.Schema({
  sensor_name: String,
  velocidad: Number,
  direccion: String,
  date: Date
}, { versionKey: false });

const Viento = mongoose.model('Viento', VientoSchema);

async function insertarMultiViento() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      sensor_name: "Sensor viento molino",
      velocidad: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      direccion: faker.helpers.arrayElement(['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste']),
      date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return Viento.insertMany(multiDoc);
}

insertarMultiViento()
 .then(v => {
   console.log("RESULTADO VIENTO:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR VIENTO", err);
   process.exit();
});

const trenFrecuenciaSchema = new mongoose.Schema({
  sensor_name: String,
  frecMañana: Number,
  frecTarde: Number,
  frecNoche: Number,
  date: Date
}, { versionKey: false });

const TrenFrecuencia = mongoose.model('TrenFrecuencia', trenFrecuenciaSchema);

async function insertarMultiTren() {
  var multiDoc = [];
  const total = 30;
  var newDoc;
  for (var i = 0; i < total; i++) {
    let frecMañana = faker.number.int({ min: 2, max: 10});
    let frecTarde = faker.number.int({ min: 2, max: 10});
    let frecNoche = faker.number.int({ min: Math.max(frecMañana, frecTarde) + 1, max: 20});
    newDoc = { 
      sensor_name: "Sensor frecuencia tren",
      frecMañana: frecMañana,
      frecTarde: frecTarde,
      frecNoche: frecNoche,
      date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TrenFrecuencia.insertMany(multiDoc);
}

insertarMultiTren()
 .then(v => {
   console.log("RESULTADO TREN:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR TREN", err);
   process.exit();
});