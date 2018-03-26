// Modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');

var auth = require('./modules/auth');
var books = require('./modules/books');

var app = express();
const port = 3000;

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'cpsc2221',
    saveUninitialized: true,
    resave: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(auth.aclSession);

// Database
var con = mysql.createConnection({
    host: "localhost",
    user: "btc",
    password: "cpsc2221",
    database: "booktradingclub"
})
con.connect(function(err) {
    try {
        if(err) throw err;
    } catch(e) {
        console.log('Database connection failed');
    }
});

// Routes

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register', {});
});

app.get('/dashboard', function(req, res) {
    books.featuredBooks(con, 12, function(result) {
        res.render('dashboard', {
            books: result
        });
    });
});

app.get('/dashboard/mybooks', function(req, res) {
    books.myBooks(con, req.session.email, function(result) {
        res.render('mybooks', {
            books: result
        });
    });
});

app.get('/dashboard/uploadBook', function(req, res) {
    res.render('uploadBook');
});

app.delete('/dashboard/mybooks', function(req, res) {
    books.deleteBook(con, req.body.id, function(err) {
        if(err) {
            res.status(400).end();
        } else {
            // TODO: Send E-mail
            res.status(200).end();
        }
    });
});

app.post('/login', function(req, res) {
    auth.authUser(req.body, con, function(response) {
        if(response) {
            req.session.email = req.body.email;
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    });
});

app.post('/dashboard/uploadBook', function(req, res) {
    books.uploadBook(con, req.session.email, req.body, function(err) {
        if(err) {
            res.status(400).end();
        } else {
            res.status(200).end();
        }
    });
});

app.post('/register', function(req, res) {
    try {
        auth.regUser(req.body, con, function() {
            req.session.email = req.body.email;
            res.status(200).end();
        });
     } catch(e) {
       res.status(401).end();
    }
});

app.put('/dashboard', function(req, res) {
    books.requestBook(con, req.session.email, req.body.id, function(err) {
        if(err) {
            res.status(400).end();
        } else {
            // TODO: Send E-mail
            res.status(200).end();
        }
    });
});

// Listener
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});
