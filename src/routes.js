const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res) => {
    res.end('Login de usuarios');
});

//inicio (root)
router.get('/', (req, res) => {
    res.end('Bienvenido', {
        layout: 'index'
    });
});

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