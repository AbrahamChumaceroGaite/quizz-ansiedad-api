const mysql = require("mysql2");
//BD DEVELOPMENT

/* const connection = mysql.createConnection({
  host: 'clnyqxapp00smpmcgshl9x1hl',
  user: 'clnyqxapn0hhycgpmfdsh2yk9',
  password: 'LE6cWv1u67UKn1UvwwzwfDCu',
  database: 'guide'
}); */


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password@2023',
  database: 'guia_ansiedad'
});

module.exports = connection;