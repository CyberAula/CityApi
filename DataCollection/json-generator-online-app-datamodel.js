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
  '{{repeat(20)}}',
  { 
  _id: '{{objectId()}}',
  index: '{{index()}}',
  sensorType: '{{random("temperature", "energy", "traffic lights state", "street lights state", "wind speed")}}',
  localization: "{{city()}}, {{country()}}",
  altitude: "{{floating(0, 1000, 2)}}",
  latitude: '{{floating(-90.000001, 90)}}',
  longitude: '{{floating(-180.000001, 180)}}',
  isActive: '{{bool()}}',
  date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
  model: '{{random("Bosch", "Sony", "STMicroelectronics", "Siemens", "TE Connectivity", "Texas Instruments")}}'
  }
]
