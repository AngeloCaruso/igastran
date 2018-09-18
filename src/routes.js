const express = require('express');
const router = express.Router();
const mysql = require('../models/dbconnection');

router.get('/login', (req, res) => {
    res.end('Login de usuarios');
});

//Manejo de imagenes
router.get('/upload', (req, res) => {
    res.sendFile('D:/user-/Escritorio/Angelo/Cosas/Documentos/Proyectos programación/Nodegastran/views/upload.html');
});
//uploadcare - blueimp
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
        let {nombre, usuario, pass} = req.body;
        mysql.query('insert into usuarios(nombre, usuario, pass) values (?, ?, ?)', [nombre, usuario, pass], (err) => {
            if (!err) {
                res.end('Usuario agregado');
            }else{
                console.log(err);
            }
        });
    })
    .put((req, res) => {
        let {id, nombre, usuario, pass} = req.body;
        mysql.query('update usuarios set nombre = ?, usuario = ?, pass = ? where id = ?', [nombre, usuario, pass, id], (err) => {
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