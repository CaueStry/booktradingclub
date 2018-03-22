module.exports = {
    registerUser: function(con, user) {
        con.query(`
            INSERT INTO SYS_User VALUES (
                ${user.langaraid},
                '${user.firstName}',
                '${user.lastName}',
                '${user.address}',
                '${user.role}',
                '${user.email}',
                '${user.password}'
            );
        `, function(err, result) {
            if(err) throw err;
        });
        if(user.role == "student") {
            con.query(`
                INSERT INTO Student(langara_id) VALUES (
                    ${user.langaraid}
                );
            `, function(err, result) {
                if(err) throw err;
            });
        } else if(user.role == "staff") {
            con.query(`
            INSERT INTO Staff(langara_id) VALUES (
                ${user.langaraid}
            );
            `, function(err, result) {
                    if(err) throw err;
            });
        }
    }
}
module.exports = {
    //Upload book
    uploadBook: function(con, book) {
        //Insert into book table
        con.query(`
            INSERT INTO book VALUES (
                ${book.isbn},
                '${book.title}',
                '${book.edition}',
                '${book.author}',
                '${book.coverUrl}',
                '${book.description}'
            );
        `, function(err, result) {
            if(err) throw err;
        });
        //insert into book_copy table
        con.query(`
            INSERT INTO owned_copy(owner_langara_id, book_id, book_condition, book_price, user_image_url) VALUES (
              ${book.ownerLangaraId},
              ${book.isbn},
              '${book.copyCondition}',
              ${book.copyPrice},
              '${book.coverUrl}'
            );
        `, function(err, result) {
            if(err) throw err;
        });
    }
}
