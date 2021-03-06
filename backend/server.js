const express = require("express");
const mysql = require("mysql");

//let cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//allow cross origin access
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

const db = mysql.createConnection({
  host: "group-homes-aws.coq4sg4wiosp.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "flatwhite",
  database: "ForsterCareSystem",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successful MySQL connection");
  }
});

app.post("/addCandidate", (req, res) => {
  const candidate = {
    id: req.body.id,
    income: req.body.income,
    exp: req.body.exp,
    email: req.body.email,
    famType: req.body.famType,
  };
  console.log(candidate);
  let sql =
    "INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)\n" +
    `VALUES (\"${candidate.id}\",
    \"${candidate.income}\",
    \"${candidate.famType}\",
    \"${candidate.exp}\",
    \"${candidate.email}\")
     ON DUPLICATE KEY UPDATE 
     id=\"${candidate.id}\",
     income=\"${candidate.income}\",
     family_type=\"${candidate.famType}\",
     foster_experience=\"${candidate.exp}\",
     contact=\"${candidate.email}\"
     ;\n`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Add candidate");
  });
});

app.post("/addRelation", (req, res) => {
  let sql =
    "INSERT INTO Fosters_From (candidate_id,child_ID,date)\n" +
    `VALUES (\"${req.body.candidateId}\",
    \"${req.body.childId}\",
    \"${req.body.date}\");\n`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Add relation");
  });
});

app.post("/delete", (req, res) => {
  let sql = "";

  if (req.body.table === "candidates") {
    sql = "DELETE FROM Candidates WHERE ID =" + req.body.id;
  } else if (req.body.table === "child") {
    sql = "DELETE FROM Child_info_and_relations WHERE child_ID =" + req.body.id;
  }

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("delete");
  });
});

app.post("/addChild", (req, res) => {
  const child = {
    id: req.body.id,
    name: req.body.name,
    ethnicity: req.body.ethnicity,
    birthday: req.body.birthday,
    gender: req.body.gender,
    gha: req.body.gha,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  console.log(child);
  let sql =
    "INSERT INTO Child_info_and_relations (child_ID,name,ethnicity,birthday,gender,group_home_address,resident_start_date, resident_end_date )\n" +
    `VALUES (\"${child.id}\",
    \"${child.name}\",
   \"${child.ethnicity}\",
   \"${child.birthday}\",
   \"${child.gender}\",
   \"${child.gha}\",
   \"${child.startDate}\",
    \"${child.endDate}\")
      ON DUPLICATE KEY UPDATE 
      child_ID=\"${child.id}\",
      name=\"${child.name}\",
      ethnicity=\"${child.ethnicity}\",
      birthday=\"${child.birthday}\",
      gender=\"${child.gender}\",
      group_home_address=\"${child.gha}\",
      resident_start_date=\"${child.startDate}\",
      resident_end_date=\"${child.endDate}\"
      ;\n`;

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Add child");
  });
});

app.get("/query/max/income", (req, res) => {
  let sql = "SELECT MAX(Income) FROM Candidates";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE group_homes";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send("Database created");
  });
});

//Create table
app.get("/create_table", (req, res) => {
  let sql =
    "CREATE TABLE Contact (name VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL UNIQUE, PRIMARY KEY (contact))";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
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
    if (err) console.log(err);
    console.log(result);
    res.send("Deleted table: " + name);
    console.log("Deleted Table: " + name);
  });
});

//Create table
app.get("/show_databases", (req, res) => {
  let sql = "SHOW DATABASES";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Showing databases");
  });
});

app.get("/show_tables", (req, res) => {
  let sql = "SHOW TABLES";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Showing tables");
  });
});

app.get("/select/:table", (req, res) => {
  let sql = "SELECT * FROM " + req.params.table;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Showing contents from " + req.params.table);
  });
});

app.get("/use/:database", (req, res) => {
  let database = req.params.database;
  let sql = "USE " + database;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
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
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("Add contact");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/query", (req, res) => {
  let sql = req.body.query;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
    console.log("query");
  });
});

const PORT = "4000";

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
