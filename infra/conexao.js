const mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'omovht03',
    database:'agenda-petshop'
})
module.exports = conexao;