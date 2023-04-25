const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // The hostname of the database server
  user: 'root',      // The MySQL user to authenticate as
  password: 'Newpass123@1234', // The password of the MySQL user
  database: 'botmingle', // The name of the database to use
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections to create at once
  queueLimit: 0 // Maximum number of connection requests the pool will queue before returning an error
});

// Export the pool to be used in other parts of the application
module.exports = pool;
