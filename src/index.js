//Inits
const morgan = require('morgan');
const engine = require('express-ejs-layouts');
const path = require('path');
const express = require('express');

//Settings
const server = express();
server.set('port', process.env.PORT || 3000);
const port = server.get('port');

server.use(express.static(path.join(__dirname, '/assets')));

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(engine);

server.use(express.json());
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));

//Routes
server.use('/', require('./routes'));
server.get('*', (req, res) => {
    res.sendStatus(404);
    res.end('Archivo no encontrado');
});

//Server init
server.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ' + port);
});