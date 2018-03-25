// Modules
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mysql = require("mysql");
var path = require("path");
var session = require("express-session");
var queries = require("./custom_modules/queries.js");

// req.path.indexOf is necessary because routes might be /login or /login/
// and it will generate an infinite loop if you don't check it.
const aclSession = (req, res, next) => {
  const sess = req.session;

  if (!sess.email && req.path.indexOf('/login') < 0) {
    return res.redirect('/login');
  }

  if (sess.email && req.path.indexOf('/login') >= 0) {
    return res.redirect('/dashboard');
  }

  next();
}

// Middleware
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "cpsc2221",
    name: "booktradingclub",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
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

// Access Control List (ACL) Middleware
app.use(aclSession)

// Paths
app.use("/login", express.static(path.join(__dirname, "public", "login")));
app.use("/register", express.static(path.join(__dirname, "public", "registration")));
app.use("/dashboard", express.static(path.join(__dirname, "public", "dashboard")));

app.get("/getSession", function(req, res) {
    sess = req.session;
    console.log(sess.email);
    if(sess.email) {
        res.status(200).send({
            status: 200,
            email: sess.email
        });
    }
});

app.post("/login", function(req, res) {
    queries.authenticateLogin(con, req.body, function(result) {
        if(result) {
            sess = req.session;
            sess.email = req.body.email;
            res.status(200).jsonp({
                status: 200,
                redirect: "/dashboard"
            });
        } else {
            res.status(400).jsonp({
                status: 400,
                redirect: "/login"
            });
        }
    });
});

app.post("/register", function(req, res) {
    try {
        queries.registerUser(con, req.body);
        sess = req.session;
        sess.email = req.body.email;
        res.redirect("/dashboard");
    } catch(e) {
        console.log(e);
        res.status(500).send("500 Internal Error");
    }
    res.send();
});

app.post("/dashboard", function(req, res) {
    try {
        queries.uploadBook(con, req.body);
        res.status(200).send("OK");
    } catch (e) {
        console.log(e);
        res.status(500).send("500 Internal Error");
    }
});

app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.status(500).send("500 Internal Error");
        } else {
            res.redirect("/login");
        }
    });
});

// Listener
app.listen(3000, function() {
    console.log("Listening on port 3000...");
});
