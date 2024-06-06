var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Sensores:{
            type: 'object',
            properties: {
              numid: {
                type: 'number',
                example: '3',
                description: 'El índice del sensor'
              },
              name: {
                type: 'string',
                example: 'Temperatura y Humedad',
                description: 'El nombre del sensor'
              },
              collectionName: {
                type: 'string',
                example: 'Hygrothermograph',
                description: 'Colección a la que pertenece el sensor.'
              },
              allowed_params: {
                type: '[string]',
                example: '["propiedad", "min", "max"]',
                description: 'Parámetros permitidos en su query.'
              },
              desc: {
                type: 'string',
                example: 'El higrotermógrafo es una herramienta importante para darnos datos sobre la temperatura y la humedad de nuestro ambiente. Aquí  utilizaremos la raspberry  Pi para leer los datos de Temperatura y Humedad del Módulo DHT11.',
                description: 'La descripción del sensor'
              },
              uso: {
                type: 'string',
                example: 'Medir temperatura y humedad en la sala',
                description: 'Para qué se va a utilizar el sensor.'
              },
              exampleQueryDateRange: {
                type: 'string',
                example: '/sensores/1?desde=2024-05-06T22:53:14.205Z&hasta=2024-05-07T01:12:15.758Z',
                description: 'Ejemplo de consulta de rango de fechas'
              },
              visible: {
                type: 'string',
                example: 'true',
                description: 'La visibilidad del sensor'
              },
              realtime: {
                type: 'string',
                example: 'true',
                description: 'Indica si el sensor ofrece datos en tiempo real o no.'
              },
            }
          },
          Temperatura: {
            type: 'object',
            properties: {
              sensor_id: {
                type: 'number',
                example: 1,
                description: 'El índice del sensor'
              },
              nombre_sensor: {
                type: 'string',
                example: 'Sensor Temperatura y Humedad',
                description: 'El nombre del sensor.'
              },
              temp: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: 'Property'
                  },
                  value: {
                    type: 'number',
                    example: 22.5,
                    description: 'La temperatura en grados Celsius'
                  }
                }
              },
              humidity: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: 'Property'
                  },
                  value: {
                    type: 'number',
                    example: 65,
                    description: 'La humedad en porcentaje'
                  }
                }
              },
              fecha: {
                type: 'string',
                format: 'date-time',
                example: '2024-05-08T08:31:44.173Z',
                description: 'La fecha y hora cuando se tomaron los datos'
              }
            },
          },
          Raíl: {
            type: 'object',
            properties: {
              commuter: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: 'Property'
                  },
                  value: {
                    type: 'number',
                    example: 2,
                    description: 'La frecuencia del tren'
                  }
                }
              },
              sensor_id: {
                type: 'number',
                example: 2,
                description: 'El índice del sensor'
              },
              nombre_sensor: {
                type: 'string',
                example: 'Conmutador y Servomotor',
                description: 'El nombre del sensor'
              },
              fecha: {
                type: 'string',
                format: 'date-time',
                example: '2024-05-08T12:29:05.464Z',
                description: 'La fecha y hora cuando se tomaron los datos'
              }
            },
          },
          Ultrasonido: {
            type: 'object',
            properties: {
              ultasonic: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: 'Property'
                  },
                  value: {
                    type: 'number',
                    example: 458.76,
                    description: 'La distancia entre dos elementos en metros'
                  }
                }
              },
              sensor_id: {
                type: 'number',
                example: 3,
                description: 'El índice del sensor'
              },
              nombre_sensor: {
                type: 'string',
                example: 'Ultrasonido',
                description: 'El nombre del sensor'
              },
              fecha: {
                type: 'string',
                format: 'date-time',
                example: '2024-05-08T12:29:05.464Z',
                description: 'La fecha y hora cuando se tomaron los datos'
              }
            },
          },
          Farolas: {
            type: 'object',
            properties: {
              luminosity: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: 'Property'
                  },
                  value: {
                    type: 'number',
                    example: 30,
                    description: 'La intensidad de luz en amperios'
                  }
                }
              },
              sensor_id: {
                type: 'number',
                example: 4,
                description: 'El índice del sensor'
              },
              nombre_sensor: {
                type: 'string',
                example: 'Fotorresistor',
                description: 'El nombre del sensor'
              },
              fecha: {
                type: 'string',
                format: 'date-time',
                example: '2024-05-08T12:29:05.464Z',
                description: 'La fecha y hora cuando se tomaron los datos'
              }
            },
          },
        },
      },
    },
    apis: ['./routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);

  module.exports = {
    swaggerUi,
    specs
  };