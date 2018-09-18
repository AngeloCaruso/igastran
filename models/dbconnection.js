const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express-test'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);
    }else{
        console.log('Base de datos conectada');
    }
});

module.exports = mysqlConnection;