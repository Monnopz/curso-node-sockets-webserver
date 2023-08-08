const socketController = (socket) => { // el argumento socket llega con los datos del cliente
    console.log('Cliente conectado', socket.id);

    // SocketIo sabe cual cliente se conecta y se desconecta mediante su socket.id
    // En cada conexion nueva hay un id nuevo. Los ids se mantienen solo si la conexion esta abierta
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // Opcion 1
    socket.on( 'enviar-mensaje', ( payload, callback ) =>{ // Escucha el servidor cuando el cliente lo emite
        // El 'callback' se mandó como argumento de la funcion desde el cliente
        
        //Suponiendo que ya insertamos en BD y nos devuelve un ID
        const id = 123456;

        // Este imprime 'Desde el server { id: blabalbla, fecha: 1556566585 }' en el cliente que lo emitió
        callback( { id, fecha: new Date().getTime() } ); // De esta manera solo le resoonde al cliente que mandó el mensaje (1 a 1)

        // this.io.emit(' enviar-mensaje ', payload); // El servidor de sockets emite al cliente. Todos los clientes lo reciben
        
        // socket.emit('enviar-mensaje', payload);

        // Este impprime '{ mensaje: Cliente 1, id: 123456, ... }' en todos los clientes excepto el que originalmente lo emitió
        socket.broadcast.emit('enviar-mensaje', payload); // si el broadcast es con el socket, le llega a todos menos a mi mismo
    });

    // Opcion 2 para mensaje personalizado (1 a 1)
    // En lugar de manejar ids en la comunicación de los sockets, 
    // basta con emitir el mensaje hacia el cliente con la 
    // instancia que devuelve el evento que abre la conexión 
    // con el cliente del lado del servidor, y Socket.io 
    // interpretará por sí solo. Me explico, esto ocurre:
    // Broadcast
    // this.io.on('custom-event', ...);
    // Unicast
    // socket.on('custom-event', ( payload ) => {
    //     socket.emit('custom-event', payload);
    // });

}

module.exports = {
    socketController
}