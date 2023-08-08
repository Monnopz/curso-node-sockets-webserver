require('dotenv').config(); //Se importa dotenv y se utiliza la configuracion por defecto

const Server = require('./models/server');

const server = new Server();

server.listen();