// Node Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var queries = require("./queries.js");
var path = require("path");

// Midleware
app.use(bodyParser.json());
app.use(express.json());

// Database Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "btc",
    password: "cpsc2221",
    database: "booktradingclub"
});

con.connect(function(err) {
    if(err) throw err;
});

// Routing
app.use("/", express.static(path.join(__dirname, "public", "login")));
app.use("/register", express.static(path.join(__dirname, "public", "registration")));
app.use("/dashboard", express.static(path.join(__dirname, "public", "dashboard")));

app.post("/register", function(req, res) {
    queries.registerUser(con, req.body);
    res.status(200);
    res.send();
});

app.post("/dashboard", function(req, res) {
    queries.uploadBook(con, req.body);
    res.status(200);
    res.send();
});

// Listener
app.listen(3000);
