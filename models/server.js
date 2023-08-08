const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = http.createServer( this.app ); // este http viene por defecto en Node. Este server se levantará, no el de express
        this.io = socketio(this.server); //Da de alta el servidor de socket.io

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Configuracion de sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets() {
        // 1) "this.io.emit()" devuelve respuesta a absolutamente todos los sockets.
        // 2) "socket.emit()" devuelve respuesta solo al socket que mandó mensaje.
        // 3) "socket.broadcast.emit()" devuelve respuesta al resto de sockets menos al que mandó mensaje (como el segundo pero a la inversa)

        // Al abrir una conexion de sockets, en el cliente hay que decirle que se conecte a esta conexion
        this.io.on('connection', socketController);

    }

    listen() {
        // Para comprobar que se instaloó todo correctamente podemos acceder a esta url
        //http://localhost:8080/socket.io/socket.io.js
        // Es un path que crea automaticamente el servidor de web sockets
        // Este archivo es la libreria que se debe de trabajar por parte del cliente de sockets
        // http://localhost:8080 es el servidor de sockets
        this.server.listen( this.port, () => { // server es el de http, no se levanta el de express
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;