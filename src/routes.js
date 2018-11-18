const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const passport = require('passport');
const upload = multer({
    dest: 'src/images/uploaded_images/',
    preservePath: true
});
const mysql = require('./models/dbconnection');

router.get('/login', (req, res) => {
    res.end('Login de usuarios');
});

//uploadcare - blueimp
//inicio (root)
router.get('/', (req, res) => {
    res.end('Bienvenido', {
        layout: 'index'
    });
});

router.get('/user/:id_usuario', (req, res) => {
    mysql.query('select * from usuarios where estado = 1 and id = ?', [req.params.id_usuario], (err, rows) => {
        res.locals = {
            nombre: rows[0].nombre + ' ' + rows[0].apellidos,
            usuario: rows[0].username
        };
        res.render('perfil', {
            layout: 'index'
        });
    });
});

//login - registro
router.get('/ingresar', (req, res) => {
    res.render('ingresar', {
        layout: 'index'
    });
});

router.post('/ingresar', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/ingresar',
    passReqToCallback: true
}))

router.post('/login', (req, res) => {

});

router.post('/upload', upload.single('archivo'), (req, res) => {
    let {
        mimetype,
        filename
    } = req.file;
    res.end(filename + '.' + path.basename(mimetype));
});

//logout
router.get('/logout', (req, res) => {
    res.render('index');
});

module.exports = router;