var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kimbri',
  password        : 'asaprockymusicvideos',
  database        : 'cs340_kimbri'
});
module.exports.pool = pool;
