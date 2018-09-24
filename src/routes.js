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

//login - registro
router.get('/ingresar', (req, res) => {
    res.render('ingresar');
});

//Autenticacion
router.post('/login', (req, res) => {
    let { usuario_correo, password } = req.body;
    res.end();
    //res.redirect('/perfil');
});
router.post('/registro', (req, res) => {
    let { nombre, apellidos, usuario, correo, password } = req.body;
    let consulta = 'insert into usuarios(nombre, apellidos, usarname, password, correo) values (?, ?, ?, ?, ?)';
    mysql.query(consulta, [nombre, apellidos, usuario, correo, password], (err) => {
        if(!err){
            
        }else{
            console.log(err);
        }
    });
    res.redirect('/perfil');
});

//logout
router.get('/logout', (req, res) => {
    res.render('index');
});

//Perfil
router.get('/perfil', (req, res) => {
    res.render('perfil');
});

//Manejo de usuarios
router.route('/usuarios')
    .get((req, res) => {
        //res.end('Usuario buscado: '+ req.params.id);
        mysql.query('select * from usuarios', (err, rows) => {
            if (!err) {
               res.json(rows);
            }else{
                console.log(err);
            }
        });
    })
    .post((req, res) => {
        let {nombre, apellidos, username, password, correo} = req.body;
        let consulta = 'insert into usuarios(nombre, apellidos, username, password, correo) values (?, ?, ?)';
        mysql.query(consulta, [nombre, apellidos, username, password, correo], (err) => {
            if (!err) {
                res.end('Usuario agregado');
            }else{
                console.log(err);
            }
        });
    })
    .put((req, res) => {
        let {id, nombre, apellidos, username, password, correo} = req.body;
        let consulta = 'update usuarios set nombre = ?, apellidos = ?, username = ?, correo = ? where id = ?';
        mysql.query(consulta , [nombre, apellidos, username, password, correo, id], (err) => {
            if (!err) {
                res.end('Usuario actualizado');
            }else{
                console.log(err);
            }
        });
    })
    /*.delete((req, res) => {
        let {id} = req.body;
        mysql.query('update usuarios set estado = 1 where id = ?', [id], (err) => {
            if (!err) {
                res.end('Usuario eliminado');
            }else{
                console.log(err);
            }
        });
    })*/;

module.exports = router;