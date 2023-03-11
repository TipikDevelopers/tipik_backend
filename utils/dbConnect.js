const mysql = require("mysql");
const env = require("dotenv");
var http = require("http");
/* http
  .createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, { "Content-Type": "text/plain" });
    // Send the response body as "Hello World"
    response.end("Hello World\n");
  })
  .listen(8081);
// Console will print the message
console.log("Server running at http://176.41.30.32:8081/"); */

env.config();

try {
  const con = mysql.createConnection({
    host: "database-1.cbqtw5d7kdz3.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "tipik.123",
    port: 3306,
  });

  con.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
    }
  });
  //con.query("use test;");
  module.exports = con;
} catch {
  console.log("databes connection issues");
}
