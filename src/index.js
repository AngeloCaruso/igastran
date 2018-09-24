const morgan = require('morgan');
const engine = require('ejs-mate');
const path = require('path');
const express = require('express');
const server = express();
//Settings
server.set('port', process.env.PORT || 3000);
const port = server.get('port');

server.set('views', path.join(__dirname, 'views'));
server.engine('ejs', engine);
server.set('view engine', 'ejs');

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