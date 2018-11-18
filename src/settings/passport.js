const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./database');
module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db.query('select * from usuarios where id = ? and estado = 1', [id], (err, rows) => {
            done(err, rows[0]);
        })
    });
    passport.use(
        'local-register',
        new localStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, username, password, done) => {
                let extraData = req.body;
                db.query(
                    'select * from usuarios where (username = ? or correo = ?) and estado = 1',
                    [username, extraData.correo],
                    (err, rows) => {
                        if (err) {
                            return done(err);
                        }
                        if (rows.length) {
                            return done(null, false, req.flash('registerMessage', 'Usuario o Correo existente'))
                        } else {
                            bcrypt.hash(password, 10).then((hash) => {
                                let newUser = {
                                    userName: username,
                                    password: hash,
                                    nombre: extraData.nombre,
                                    apellidos: extraData.apellidos,
                                    correo: extraData.correo
                                }
                                let insertQ = 'insert into usuarios (nombre, apellidos, username, password, correo) values(?, ?, ?, ?, ?)';
                                db.query(insertQ, [newUser.nombre, newUser.apellidos, newUser.userName, newUser.password, newUser.correo], (err, irows) => {
                                    newUser.id = irows.insertId;
                                    return done(null, newUser);
                                });
                            })
                        }
                    }
                );
            }
        )
    );

    passport.use(
        'local-login',
        new localStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, username, password, done) => {
                db.query(
                    'select * from usuarios where (username = ? or correo = ?) and estado = 1',
                    [username, username],
                    (err, rows) => {
                        if (err) {
                            return done(err);
                        }
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'Usuario no encontrado'));
                        }
                        bcrypt.compare(password, rows[0].password).then((res) => {
                            if (res) {
                                return done(null, rows[0]);
                            } else {
                                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));
                            }
                        })
                    }
                )
            }
        )
    )
}