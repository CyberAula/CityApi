/* usado para hay una app online para generar dataset
https://json-generator.com/
*/
/*
Fechas transformadas a ISODate con:

db.usuarios.updateMany(
  { },
  [
    {        
      $set: { "car.datebought": { $dateFromString: { dateString: "$car.datebought" } } }
    }
  ]
)

*/
[
    '{{repeat(1000, 1000)}}',
    {
      _id: '{{objectId()}}',
      index: '{{index()}}',
      guid: '{{guid()}}',
      isActive: '{{bool()}}',
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      picture: 'http://placehold.it/32x32',
      age: '{{integer(20, 40)}}',
      eyeColor: '{{random("blue", "brown", "green")}}',
      name: '{{firstName()}} {{surname()}}',
      gender: '{{gender()}}',
      company: '{{company().toUpperCase()}}',
      email: '{{email()}}',
      phone: '+1 {{phone()}}',
      car: { 
        plate: '{{integer(1000, 9999)}}',
        model: '{{random("Ford", "BMW", "Fiat", "Skoda", "Volvo", "Volkswagen")}}',
        color: '{{random("red", "green", "blue", "yellow", "white", "black", "silver")}}',
        datebought: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
        },
      address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      about: '{{lorem(1, "paragraphs")}}',
      registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
      latitude: '{{floating(-90.000001, 90)}}',
      longitude: '{{floating(-180.000001, 180)}}',
      tags: [
        '{{repeat(7)}}',
        '{{lorem(1, "words")}}'
      ],
      friends: [
        '{{repeat(3)}}',
        {
          id: '{{index()}}',
          name: '{{firstName()}} {{surname()}}',
          age: '{{integer(20, 40)}}',
          height: '{{integer(100, 200)}}',
        }
      ],
      greeting: function (tags) {
        return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
      },
      favoriteFruit: function (tags) {
        var fruits = ['apple', 'banana', 'strawberry', 'orange', 'kiwi', 'pineapple', 'grape', 'watermelon', 'melon', 'pear'];
        return fruits[tags.integer(0, fruits.length - 1)];
      }
    }
  ]