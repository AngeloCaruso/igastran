const express = require('express');
const server = express();
const morgan = require('morgan');
//Settings
server.set('port', process.env.PORT);
const port = server.get('port');

server.use(express.json());
server.use(morgan('dev'));

//Routes
server.get('/', (req, res) => {
    res.end('I am root');
});
server.use(require('./routes'));
server.get('*', (req, res) => {
    res.sendStatus(404);
    res.end('Archivo no encontrado');
});

//Server init
server.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ' + port);
});