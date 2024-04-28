/* hay una app online para hacer algo similar
https://json-generator.com/
*/
import mongoose from 'mongoose';
import { fakerEN as faker } from '@faker-js/faker';

const dbname = "school";
faker.seed(123);
await mongoose.connect('mongodb://0.0.0.0/'+dbname, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});


const studentSchema = new mongoose.Schema({ name : String,
    scores : Array,
    age : Number,
    nationality : String,
    last_login: String,
    first_login: String,
    tags: Array,
    fav_numbers: Array,
    createdAt: Date,
    updatedAt: Date,
    latitude: Number,
    longitude: Number,
    ip: String,
    has_car: Boolean,
    email: String,
    phone: String,
    address: Object,    
    picture: String,
    password: String
   }, {
     versionKey: false
 });
 
const Database = mongoose.model('student', studentSchema);


async function insertarMulti() {
  var multiDoc = [];
  const total = 500;
  var newDoc;
  for (var i = 0; i < total; i++) {
    newDoc = { name: faker.person.fullName(),
                age: faker.number.float({min: 18, max: 65}),
                nationality: faker.location.country(),
                last_login: faker.date.recent(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude(),
                ip: faker.internet.ip(),
                has_car: faker.datatype.boolean(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: { street: faker.location.street(), city: faker.location.city(), zip: faker.location.zipCode(), country: faker.location.country() },
                picture: faker.image.avatar(),
                password: faker.internet.password(7,true)
    };

    //add random number of tags
    const total2 = faker.number.int({min: 0, max: 5});
    newDoc.tags = [];
    for (var j = 0; j < total2; j++) {
      newDoc.tags.push(faker.random.word());
    }

    //add random number of fav_numbers
    const total4 = faker.number.int({min: 0, max: 5});
    newDoc.fav_numbers = [];
    for (var j = 0; j < total4; j++) {
      newDoc.fav_numbers.push(faker.number.int({min: 0, max: 100}));
    }
    
    const types = ["exam", "quiz", "homework", "test", "classwork", "other"];
    newDoc.scores = [];
    //add random number of scores
    const total3 = faker.number.int({min: 0, max: 5});
    for (var j = 0; j < total3; j++) {
      newDoc.scores.push({type: types[Math.floor(Math.random() * types.length)], score: faker.number.int({min: 0, max: 10, precision: 0.1})});
    }
    
    //random date in first_login field as string
    newDoc.first_login = faker.number.int({min: 2019, max: 2021}) + "-" + faker.number.int({min: 1, max: 12}) + "-" + faker.number.int({min: 1, max: 28});

    multiDoc.push(newDoc);
  }
  
  let result= await Database.insertMany(multiDoc);
  console.dir(multiDoc);
  return result ;
}


insertarMulti()
 .then(v => {
   console.log("RESULTADO:", v);
   process.exit();
 }).catch(err => {
   console.error("ERROR", err);
   process.exit();
 });