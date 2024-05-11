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
  nombre_sensor: String,
  temperatura: Number,
  humedad: Number,
  fecha: Date
  }, {
     versionKey: false
});

const TemperaturaNorte = mongoose.model('TemperaturaNorte', temperaturaSchema);

async function insertarMultiTemperaturaNorte() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor temperatura norte",
      temperatura: faker.number.float({ min: -20, max: 20, precision: 0.1}),
      humedad: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TemperaturaNorte.insertMany(multiDoc);
}

insertarMultiTemperaturaNorte()
 .then(v => {
   console.log("RESULTADO:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR", err);
   process.exit();
});

const TemperaturaSur = mongoose.model('TemperaturaSure', temperaturaSchema);

async function insertarMultiTemperaturaSur() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor temperatura sur",
      temperatura: faker.number.float({ min: -5, max: 40, precision: 0.1}),
      humedad: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TemperaturaSur.insertMany(multiDoc);
}

insertarMultiTemperaturaSur()
 .then(v => {
   console.log("RESULTADO:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR", err);
   process.exit();
});
 
const TemperaturaEste = mongoose.model('TemperaturaEste', temperaturaSchema);

async function insertarMultiTemperaturaEste() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor temperatura este",
      temperatura: faker.number.float({ min: -20, max: 40, precision: 0.1}),
      humedad: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
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

const TemperaturaOeste = mongoose.model('TemperaturaOeste', temperaturaSchema);

async function insertarMultiTemperaturaOeste() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor temperatura oeste",
      temperatura: faker.number.float({ min: -20, max: 40, precision: 0.1}),
      humedad: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
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
  nombre_sensor: String,
  velocidad: Number,
  direccion: String,
  fecha: Date
}, { versionKey: false });

const Viento = mongoose.model('Viento', VientoSchema);

async function insertarMultiViento() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor viento molino",
      velocidad: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      direccion: faker.helpers.arrayElement(['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste']),
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
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
  nombre_sensor: String,
  frecMañana: Number,
  frecTarde: Number,
  frecNoche: Number,
  fecha: Date
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
      nombre_sensor: "Sensor frecuencia tren",
      frecMañana: frecMañana,
      frecTarde: frecTarde,
      frecNoche: frecNoche,
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
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

const luzSchema = new mongoose.Schema({
  nombre_sensor: String,
  hora_amanecer: String,
  hora_anochecer: String,
  farolas: [{
    zona: String,
    hora_encendido: String,
    hora_apagado: String,
  }],
  fecha: Date
}, { versionKey: false });

const Luz = mongoose.model('Luce', luzSchema);

function fakeTime(minHour, maxHour) {
  const hour = faker.number.int({ min: minHour, max: maxHour });
  const minute = faker.number.int({ min: 0, max: 59 });
  const second = faker.number.int({ min: 0, max: 59 });

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

function fakeTimeAfter(time, minAddMinutes, maxAddMinutes) {
  const [hour, minute, second] = time.split(':').map(Number);
  const addMinutes = faker.number.int({ min: minAddMinutes, max: maxAddMinutes });

  const newMinute = (minute + addMinutes) % 60;
  const newHour = (hour + Math.floor((minute + addMinutes) / 60)) % 24;

  return `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

async function insertarMultiLuz() {
  var multiDoc = [];
  const total = 20;
  var newDoc;
  for (var i = 0; i < total; i++) {
    const hora_amanecer = fakeTime(7, 8);
    const hora_anochecer = fakeTime(19, 20);

    newDoc = { 
      nombre_sensor: "Sensor luz",
      hora_amanecer: hora_amanecer,
      hora_anochecer: hora_anochecer,
      farolas: [
        { zona: 'Norte', hora_encendido: fakeTimeAfter(hora_anochecer, 10,30), hora_apagado: fakeTimeAfter(hora_amanecer, 10,30) },
        { zona: 'Este', hora_encendido: fakeTimeAfter(hora_anochecer, 10,30), hora_apagado: fakeTimeAfter(hora_amanecer, 10,30) },
        { zona: 'Sur', hora_encendido: fakeTimeAfter(hora_anochecer, 10,30), hora_apagado: fakeTimeAfter(hora_amanecer, 10,30) },
        { zona: 'Oeste', hora_encendido: fakeTimeAfter(hora_anochecer, 10,30), hora_apagado: fakeTimeAfter(hora_amanecer, 10,30) }
      ],
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return Luz.insertMany(multiDoc);
}

insertarMultiLuz()
 .then(v => {
   console.log("RESULTADO LUZ:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR LUZ", err);
   process.exit();
});

const traficoSchema = new mongoose.Schema({
  nombre_sensor: String,
  vehículos: Number,
  velocidad_media: Number,
  nivel_congestion: String,
  hora_punta: [String],
  fecha: Date
}, { versionKey: false });

const TraficoCentro = mongoose.model('TraficoCentro', traficoSchema);

async function insertarMultiTraficoCentro(){
  var multiDoc = [];
  const total = 30;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor tráfico centro",
      vehículos: faker.number.int({ min: 500, max: 1000 }),
      velocidad_media: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      nivel_congestion: faker.helpers.arrayElement(['Bajo', 'Medio', 'Alto']),
      hora_punta: [fakeTime(7, 9), fakeTime(13, 15), fakeTime(18, 20)],
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TraficoCentro.insertMany(multiDoc);
}

insertarMultiTraficoCentro()
 .then(v => {
   console.log("RESULTADO TRÁFICO CENTRO:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR TRÁFICO CENTRO", err);
   process.exit();
});

const TraficoAfueras = mongoose.model('TraficoAfuera', traficoSchema);

async function insertarMultiTraficoAfueras(){
  var multiDoc = [];
  const total = 30;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { 
      nombre_sensor: "Sensor tráfico afueras",
      vehículos: faker.number.int({ min: 500, max: 1000 }),
      velocidad_media: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      nivel_congestion: faker.helpers.arrayElement(['Bajo', 'Medio', 'Alto']),
      hora_punta: [fakeTime(7, 9), fakeTime(13, 15), fakeTime(18, 20)],
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z'})
    };
    multiDoc.push(newDoc);
  }
  return TraficoAfueras.insertMany(multiDoc);
}

insertarMultiTraficoAfueras()
 .then(v => {
   console.log("RESULTADO TRÁFICO AFUERAS:", v);
   process.exit();
}).catch(err => {
   console.error("ERROR TRÁFICO AFUERAS", err);
   process.exit();
});