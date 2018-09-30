const express = require('express');
const router = express.Router();
const mysql = require('./models/dbconnection');

router.get('/login', (req, res) => {
    res.end('Login de usuarios');
});

//uploadcare - blueimp
//inicio (root)
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/usuario/:id_usuario', (req, res) => {
    mysql.query('select * from usuarios where estado = 1 and id = ?',[req.params.id_usuario] , (err, rows, fields) =>{
        res.render('perfil', [
            usuario = rows[0].username, 
            nombre = rows[0].nombre,
            apellido = rows[0].apellidos
        ]);
    });
});

//login - registro
router.get('/ingresar', (req, res) => {
    res.render('ingresar');
});

//Autenticacion
router.post('/login', (req, res) => {
    
});
router.post('/registro', (req, res) => {
    let { nombre, apellidos, usuario, correo, password } = req.body;
    let consulta = 'insert into usuarios(nombre, apellidos, username, password, correo) values (?, ?, ?, ?, ?)';
    mysql.query(consulta, [nombre, apellidos, usuario, correo, password], (err) => {
        if(!err){
            console.log('registrado');
        }else{
            console.log(err);
        }
    });
    res.redirect('/ingresar');
});

//logout
router.get('/logout', (req, res) => {
    res.render('index');
});

module.exports = router;