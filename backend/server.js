const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

//allow cross origin access
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const db = mysql.createConnection({
  host: "group-homes-aws.coq4sg4wiosp.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "flatwhite",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Successful MySQL connection");
  }
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE group_homes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

//Create table
app.get("/create_table", (req, res) => {
  let sql =
    "CREATE TABLE Contact (name VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL UNIQUE, PRIMARY KEY (contact))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Created table");
    console.log("Created table");
  });
});

//Create table
app.get("/delete_table/:name", (req, res) => {
  let table = req.params.name;
  let sql = "DROP TABLE " + table;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Deleted table: " + name);
    console.log("Deleted Table: " + name);
  });
});

//Create table
app.get("/show_databases", (req, res) => {
  let sql = "SHOW DATABASES";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log("Showing databases");
  });
});

app.get("/show_tables", (req, res) => {
  let sql = "SHOW TABLES";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log("Showing tables");
  });
});

app.get("/select/:table", (req, res) => {
  let sql = "SELECT * FROM " + req.params.table;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log("Showing contents from " + req.params.table);
  });
});

app.get("/use/:database", (req, res) => {
  let database = req.params.database;
  let sql = "USE " + database;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log("Using group homes");
  });
});

app.get("/add/:name/:contact", (req, res) => {
  let name = req.params.name;
  const contact = req.params.contact;
  let sql =
    "INSERT INTO Contact (name, contact)\n" +
    `VALUES (\"${name}\",\"${contact}\");\n`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log("Add contact");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = "4000";

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
