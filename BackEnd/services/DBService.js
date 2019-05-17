var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'word_db',
});

connection.connect(err => {
  if (err) throw new Error('mySql failed connection!');
  console.log('connected to SQL server');
})

async function runSQL(query) {
  console.log(query)
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      else resolve(results);
    });
  })
}

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


module.exports = {
  runSQL
}
