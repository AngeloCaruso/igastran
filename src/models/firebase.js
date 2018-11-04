const firebase = require('firebase-admin');
const serviceAccount = require('./firebase.json');

const firebaseInit = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})

module.exports = firebaseInit;