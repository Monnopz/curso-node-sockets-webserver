// El socket cliente cuando detecta una desconexion del servidor trata de realizar la reconexion cada cierto tiempo de manera automatica

// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// Este es el socket del cliente
const socket = io(); // Este objeto viene en la libreria que se importó primero de ./socket.io/socket.io.js

// Evento listener para escuchar eventos
// Hay eventos predeterminados en socketIo, uno de ellos es el connect
socket.on('connect', () =>{

    // console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () =>{

    // console.log('Desconectado del servidor');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

});

socket.on('enviar-mensaje', ( payload ) =>{ // El cliente escucha el evento que el servidor emitió. De esta manera todos clientes escuchan todo
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    
    // Emite un evento
    // Se recomienda evitar caracteres extraños en el evento
    // Este mismo nombre se pondra en el server en el evento on
    // socket.emit( 'enviar-mensaje', payload );
    
    // Opcion 1
    socket.emit( 'enviar-mensaje', payload , (id) =>{ // Este callback se ejecuta en el servidor, como segundo argumento de lo mandado al server, una vez que el servidor ha terminado sus ejecuciones respectivas y cuando se llama explicitamente
        console.log('Desde el server', id);
    }); // De esta manera mas personalizada se identifica un cliente de manera que el servidor manejara la respuesta a solo este cliente


    // Opcion 2 para mensaje personalizado (1 a 1)
    // socket.emit('custom-event', payload); 
    // socket.on('custom-event', (payload) =>{

    //     console.log(payload);
    
    // });

});