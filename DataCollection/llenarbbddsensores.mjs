/* hay una app online para hacer algo similar
https://json-generator.com/
*/
import mongoose from 'mongoose';
import { fa, fakerES as faker } from '@faker-js/faker';

const dbname = "Datos";
faker.seed(123);
await mongoose.connect('mongodb://0.0.0.0/' + dbname, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
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
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
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
    let value = faker.helpers.arrayElement(['1', '2']);
    newDoc = {
      sensor_id: 2,
      nombre_sensor: "Conmutador y Servomotor",
      commuter: {
        type: "Property",
        value: value
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
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

const ultrasonidoSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  ultasonic: {
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

const Ultrasonido = mongoose.model('Ultrasonido', ultrasonidoSchema);

async function insertUltasonic() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = {
      sensor_id: 3,
      nombre_sensor: "Ultrasonido",
      ultasonic: {
        type: "Property",
        value: faker.number.float({ min: 0, max: 1000, precision: 0.01 })
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
    };
    multiDoc.push(newDoc);
  }
  return Ultrasonido.insertMany(multiDoc);
}

insertUltasonic()
  .then(v => {
    console.log("RESULTADO ULTASONIC:", v);
    process.exit();
  })
  .catch(err => {
    console.error("ERROR ULTASONIC", err);
    process.exit();
  });

const fotorresistorSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  luminosity: {
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

const Fotorresistor = mongoose.model('Fotorresistore', fotorresistorSchema);

async function insertarMultiLuminosidad() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = {
      sensor_id: 4,
      nombre_sensor: "Fotorresistor",
      luminosity: {
        type: "Property",
        value: faker.number.float({ min: 0, max: 255, precision: 0.01 })
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
    };
    multiDoc.push(newDoc);
  }
  return Fotorresistor.insertMany(multiDoc);
}

insertarMultiLuminosidad()
  .then(v => {
    console.log("RESULTADO LUMINOSIDAD:", v);
    process.exit();
  })
  .catch(err => {
    console.error("ERROR LUMINOSIDAD", err);
    process.exit();
  });

const pirSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  pir: {
    type: {
      type: String,
      default: "Property"
    },
    value: String
  },
  fecha: Date
}, {
  versionKey: false
});

const PIR = mongoose.model('PIR', pirSchema);

async function insertarMultiPIR() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = {
      sensor_id: 5,
      nombre_sensor: "PIR",
      pir: {
        type: "Property",
        value: faker.helpers.arrayElement(['HIGH', 'LOW'])
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
    };
    multiDoc.push(newDoc);
  }
  return PIR.insertMany(multiDoc);
}

insertarMultiPIR()
  .then(v => {
    console.log("RESULTADO PIR:", v);
    process.exit();
  })
  .catch(err => {
    console.error("ERROR PIR", err);
    process.exit();
  });

const rfidSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  rfid: {
    type: {
      type: String,
      default: "Property"
    },
    value: String
  },
  fecha: Date
}, {
  versionKey: false
});

const RFID = mongoose.model('RFID', rfidSchema);

async function insertarMultiRFID() {
  var multiDoc = [];
  const total = 50;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = {
      sensor_id: 6,
      nombre_sensor: "RFID",
      rfid: {
        type: "Property",
        value: faker.string.hexadecimal({ length: 10, casing: 'upper' })
      },
      fecha: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
    };
    multiDoc.push(newDoc);
  }
  return RFID.insertMany(multiDoc);
}

insertarMultiRFID()
  .then(v => {
    console.log("RESULTADO RFID:", v);
    process.exit();
  })
  .catch(err => {
    console.error("ERROR RFID", err);
    process.exit();
  });



