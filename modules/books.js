function featuredBooks(con, num, callback) {
    var result;
    var query = `
        SELECT * FROM ALL_AVAILABLE_BOOKS LIMIT ${num};
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

function requestBook(con, email, id,callback) {
    var query = `
    UPDATE owned_copy SET requested_by_langara_id=(SELECT langara_id FROM sys_user WHERE sys_user.email='${email}')
    WHERE copy_id = ${id} AND requested_by_langara_id IS NULL;
    `;
    con.query(query, function(err, result, fields) {
        callback(err, result, fields);
    });
}

function myBooks(con, email, callback) {
    var result;
    var query = `
    SELECT OC.copy_id AS copy, OC.owner_langara_id AS bOwner, OC.book_price AS bPrice, OC.user_image_url AS bUrl, B.title, B.author
      FROM owned_copy OC INNER JOIN book B ON OC.book_id = B.isbn13
      WHERE OC.owner_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}');
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

function deleteBook(con, id, callback) {
    var query = `
    DELETE FROM owned_copy WHERE copy_id=${id};
    `;
    con.query(query, function(err, result, fields) {
        callback(err, result, fields);
    });
}

function uploadBook(con, email, book, callback) {
    var query = `
      SELECT isbn13 FROM Book
          WHERE isbn13=
          ${book.isbn};`;
    con.query(query, function(err, result, fields) {
      if (result.length == 0) {
        // Insert Book
        con.query(`
            INSERT INTO Book VALUES (
                ${book.isbn},
                '${book.title}',
                '${book.edition}',
                '${book.author}'
            );`);
      }
      query = `INSERT INTO owned_copy(owner_langara_id, book_id, book_condition, book_price, user_image_url, description)
        SELECT langara_id,${book.isbn},'${book.copyCondition}', ${book.copyPrice}, '${book.coverUrl}', '${book.copyDescription}' FROM sys_user WHERE sys_user.email='${email}';`
      // Insert Owned Copy
      con.query(query , function(err, result, fields) {
          callback(err, result, fields);
      });
    });
}

module.exports = {
    featuredBooks: featuredBooks,
    requestBook: requestBook,
    myBooks: myBooks,
    deleteBook: deleteBook,
    uploadBook: uploadBook
}
