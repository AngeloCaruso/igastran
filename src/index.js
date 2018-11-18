//Modules =================================================
const express = require('express');
const session = require('express-sessions');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const engine = require('express-ejs-layouts');
const multer = require('multer');
const server = express();
const port = process.env.PORT || 3000;
require('./passport')(passport);

//Config ====================================================
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(engine);
server.use(morgan('dev'));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(express.static(path.join(__dirname, './public')));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(session({
    secret: 'IsraelNoEsUnEstadoLegitimo',
    resave: false,
    saveUninitialized: false
}));

//Basic Routes ===============================================
require('./routes')(server, passport, path, multer);
server.get('*', (req, res) => {
    res.sendStatus(404);
    res.end('Not found');
})

//Server init ================================================
server.listen(port, () => {
    console.log('El maravilloso mundo del puerto ' + port);
})
