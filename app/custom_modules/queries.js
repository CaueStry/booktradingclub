var hashing = require("./hashing.js");

module.exports = {

    // User Registration
    registerUser: function(con, user) {
        var salt = hashing.generateSalt();
        var password = hashing.sha512(user.password, salt);
        con.query(`
            INSERT INTO SYS_User(langara_id, first_name, last_name, email, upassword, salt) VALUES (
                ${user.langaraid},
                '${user.firstName}',
                '${user.lastName}',
                '${user.email}',
                '${password}',
                '${salt}'
            );
        `, function(err, result) {
            if(err) throw err;
        });
        if(user.type == "student") {
            con.query(`
                INSERT INTO Student(langara_id) VALUES (
                    ${user.langaraid}
                );
            `, function(err, result) {
                if(err) throw err;
            });
        } else if(user.type == "staff") {
            con.query(`
            INSERT INTO Staff(langara_id) VALUES (
                ${user.langaraid}
            );
            `, function(err, result) {
                    if(err) throw err;
            });
        }
    },

    // Book Registration
    uploadBook: function(con, book) {
        con.query(`
          SELECT isbn13 FROM Book
              WHERE isbn13=
              ${book.isbn}`
          , function (err, result, fields) {
            if (err) throw err;
            if (result.length == 0) {
              // Insert Book
              con.query(`
                  INSERT INTO Book VALUES (
                      ${book.isbn},
                      '${book.title}',
                      '${book.edition}',
                      '${book.author}'
                  );
              `, function(err, result) {
                  if(err) throw err;
              });
            }
            // Insert Owned Copy
            con.query(`
                INSERT INTO owned_copy(owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (
                  ${book.ownerLangaraId},
                  ${book.isbn},
                  '${book.copyCondition}',
                  ${book.copyPrice},
                  '${book.coverUrl}',
                  '${book.copyDescription}'
                );
            `, function(err, result) {
                if(err) throw err;
            });

        });
    },

    // Login Authentication
    authenticateLogin: function(con, user, callback) {
        con.query(`
        SELECT email FROM SYS_User
            WHERE email='${user.email}';
        `, function (err, result, fields) {
          if (err) throw err;
          if (result.length > 0) {
            con.query(`
            SELECT email, upassword, salt FROM SYS_User
            WHERE email = '${user.email}';
            `, function(err, result, fields) {
                var inputPassword = hashing.sha512(user.password, result[0].salt);                             
                if(inputPassword == result[0].upassword) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
          }
      });
    }
}
