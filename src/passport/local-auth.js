const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mysql = require('../models/dbconnection');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    mysql.query('select * from usuarios where id = ? and estado = 1', [id], (err, rows) => {
        done(err, rows[0]);
    })
})

passport.use('local-login', new localStrategy({
    usernameField: 'usuario_correo',
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) => {
    mysql.query('select * from usuarios where (username = ? or correo = ?) and password = ? and estado = 1', [user, user, password], (err, rows) => {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!rows.length) {
            console.log('no existe');
            return done(null, false, 'Error')
        }
        if (rows[0].password != password) {
            console.log('contraseña incorrecta');
            return done(null, false, 'Error');
        }
        if (!err) {
            console.log('bieen');
            return done(null, rows[0]);
        }
    })
}));

passport.use('local-register', new localStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, user, password, done) => {
    let datos = req.body;
    let userQuery = 'select * from usuarios where username = ? and estado = 1';
    let emailQuery = 'select * from usuarios where correo = ? and estado = 1';

    mysql.query(userQuery, [user], (err, rows) => {
        if (rows[0]) {
            console.log('existe');
            return done(null, false, 'Error');
        } else {
            console.log('no existe');
            mysql.query(emailQuery, [datos.correo], (err, rows1) => {
                if (rows1[0]) {
                    console.log('existe');
                    return done(null, false, 'Error');
                } else {
                    console.log('no existe');
                    let consulta = 'insert into usuarios(nombre, apellidos, username, password, correo) values (?, ?, ?, ?, ?)';
                    mysql.query(consulta, [datos.nombre, datos.apellidos, datos.usuario, datos.correo, datos.password], (err, rows2) => {
                        if (err) {
                            console.log(err);
                            return done(err);
                        } else {
                            console.log(rows2[0])
                            done(null, rows2[0]);
                        }
                    })
                }
            });
        }
    });
}));