// Modules
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var session = require("express-session");
var queries = require("./custom_modules/queries.js");

// Middleware
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
var sess;

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

// Paths
app.use("/login", express.static(path.join(__dirname, "public", "login")));
app.use("/register", express.static(path.join(__dirname, "public", "registration")));
app.use("/dashboard", express.static(path.join(__dirname, "public", "dashboard")));

//Routing
app.get("/", function(req, res) {
    sess = req.session;
    if(!sess) {
        res.redirect("/login");
    } else {
        res.redirect("/dashboard");
    }
});

// AJAX Handlers
app.post("/register", function(req, res) {
    try {
        queries.registerUser(con, req.body);
        res.status(200);
    } catch(e) {
        console.log(e);
        res.status(500);
    }
    res.send();
});

app.post("/dashboard", function(req, res) {
    try {
        queries.uploadBook(con, req.body);
        res.status(200);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
    res.send();
});

// Listener
app.listen(3000, function() {
    console.log("Listening on port 3000...");
});
