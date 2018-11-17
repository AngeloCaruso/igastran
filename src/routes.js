const express = require('express');
const router = express.Router();
const path = require('path');
const firebase = require('./models/firebase');

//fireStore init
const db = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings);

//inicio (root)
router.get('/', (req, res) => {
    res.render('mainPage', {
        layout: 'index',
        user: 'Ingresa'
    })
})
router.get('/main/:uid', (req, res) => {
    let user = req.params.uid
    firebase.auth().getUser(user)
        .then(user => {
            console.log(user)
            res.render('mainPage', {
                layout: 'index',
                user: user
            });
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/ingresar', (req, res) => {
    res.render('ingresar', {
        layout: 'index'
    })
})

router.post('/register', (req, res) => {
    let data = req.body
    firebase.auth().createUser({
            email: data.correo,
            emailVerified: false,
            password: data.password,
            displayName: data.nombre + ' ' + data.apellidos
        })
        .then(user => {
            console.log('user id', user.uid)
            res.end('user id', user.uid)
            db.doc('userSettings/' + user.uid)
                .set({
                    nombre: data.nombre + ' ' + data.apellidos,
                    foto_perfil: 'default.jpg',
                    foto_fondo: 'default.jpg'
                });
        })
        .catch(err => {
            console.log('Error al crear usuario', err)
            res.end('Error al crear usuario', err)
        })
})

router.get('/profile', (req, res) => {
    res.render('perfil', {
        layout: 'index'
    })
})

module.exports = router;
/*
var db = {
    users: [
        {
            id: 'userID',
            foto_fondo: 'ref',
            foto_perfil: 'ref',
            following:{
                user1,
                user2
            }
        }
    ],
    imagenes: [
        {
            id: 'imgID',
            url: 'ref',
            user: 'user',
            time: 'time'
        }
    ]
}
*/