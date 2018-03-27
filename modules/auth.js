var crypto = require('crypto');

function authUser(user, con, callback) {
    var response;
    var query = `
        SELECT upassword, salt
        FROM SYS_User
        WHERE email = '${user.email}';
    `;
    con.query(query, function(err, result, fields) {
        if(result.length > 0 && checkPassword(user.password, result[0].upassword, result[0].salt)) {
            response = true;
        } else {
            response = false;
        }
        callback(err, response);
    });
}

function regUser(user, con, callback) {
    var salt = generateSalt();
    var password = sha512(user.password, salt);
    var query = `INSERT INTO SYS_User(langara_id, first_name, last_name, email, upassword, salt) VALUES (
        ${user.langaraID},
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${password}',
        '${salt}'
    );`;
    con.query(query, function(err, result) {
        if(err) throw err;
    });
    if(user.type === 'student') {
        var query = `
        INSERT INTO Student(langara_id, major) VALUES (
            ${user.langaraID},
            '${user.major}'
        );`
        con.query(query, function(err, result) {
            if(err) throw err;
        });
    } else if(user.type == "staff") {
        con.query(`
        INSERT INTO Staff(langara_id, position) VALUES (
            ${user.langaraID},
            '${user.position}'
        );`,
        function(err, result) {
            if(err) throw err;
        });
    }
    callback();
}

function aclSession(req, res, next) {
    const sess = req.session;
    if(!sess.email && (req.path.indexOf('/login') < 0 && req.path.indexOf('/register') < 0)) {
        return res.redirect('/login');
    }
    if(sess.email && req.path.indexOf('/dashboard') < 0 && req.path.indexOf('/logout')) {
        return res.redirect('/dashboard');
    }

    next();
}

function sha512(password, salt) {
    var hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    var value = hash.digest("hex");
    return value;
}

function generateSalt() {
    var salt = crypto.randomBytes(64).toString("hex");
    return salt;
}

function checkPassword(attemptPassword, originalPassword, salt) {
    if(originalPassword == sha512(attemptPassword, salt)) {
        return true;
    }
    return false;
}

module.exports = {
    authUser: authUser,
    regUser: regUser,
    aclSession: aclSession
}