const mysql = require("mysql");
const env = require("dotenv");

env.config();

try {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 25060,
  });

  con.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("db connected");
    }
  });
  con.query("use defaultdb;");
  module.exports = con;
} catch {
  console.log("databes connection issues");
}
