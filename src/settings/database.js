const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'igastran'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err, 'Error en la conexion');
    }else{
        console.log('Base de datos conectada');
    }
});

module.exports = mysqlConnection;