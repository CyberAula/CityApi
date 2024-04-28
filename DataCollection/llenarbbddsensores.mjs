/* hay una app online para hacer algo similar
https://json-generator.com/
*/
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

const dbname = "Sensor";
faker.seed(123);
await mongoose.connect('mongodb://0.0.0.0/'+dbname, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});


const temperatureSchema = new mongoose.Schema({ 
  index: Number,
  sensor_id: Number,
  temperature: Number,
  humidity: Number,
  date: Date
  }, {
     versionKey: false
});
 
const Temperatura = mongoose.model('Temperatura', temperatureSchema);


const VientoSchema = new mongoose.Schema({
  index: Number,
  velocidad: Number,
  direccion: String,
  date: Date
}, { versionKey: false });

const Viento = mongoose.model('Viento', VientoSchema);

async function insertarMultiTemperatura() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      index: i,
      sensor_id: faker.number.int({ max: 99999 }),
      temperature: faker.number.float({ min: -20, max: 40, precision: 0.1}),
      humidity: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      date: faker.date.recent()
    };
    multiDoc.push(newDoc);
  }
  return Temperatura.insertMany(multiDoc);
}

insertarMultiTemperatura()
 .then(v => {
   console.log("RESULTADO:", v);
   process.exit();
 }).catch(err => {
   console.error("ERROR", err);
   process.exit();
 });

async function insertarMultiViento() {
  var multiDoc = [];
  const total = 30;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      index: i,
      velocidad: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      direccion: faker.helpers.arrayElement(['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste']),
      date: faker.date.recent()
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