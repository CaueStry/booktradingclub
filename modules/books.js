function featuredBooks(con, email,callback) {
    var result;
    var query = `
        SELECT * FROM ALL_AVAILABLE_BOOKS
        WHERE bOwner NOT IN (SELECT langara_id FROM SYS_User WHERE email = '${email}');
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
    var bookData = {mybooks: [], data: []};
    // Query 3 - Join Query
    var query = `
    SELECT OC.copy_id AS copy, OC.owner_langara_id AS bOwner, OC.book_price AS bPrice, OC.user_image_url AS bUrl, B.title, B.author
      FROM owned_copy OC INNER JOIN book B ON OC.book_id = B.isbn13
      WHERE OC.owner_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}');
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        bookData.mybooks = result;
        // Query 6 - Nested Aggregation with Group by
        query = `
        SELECT owner_langara_id, COUNT(copy_id) AS totalBooks, AVG(book_price) AS avgPrice
          FROM owned_copy
          WHERE owner_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}')
          GROUP BY owner_langara_id;
        `;
        con.query(query, function(err, result, fields) {
            bookData.data = result;
            callback(bookData);
        });
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

function approveRequest(con, id, callback) {
    var info = [];
    var errs;
    var query = `
    SELECT u.email AS email FROM SYS_User u INNER JOIN owned_copy oc ON u.langara_id = oc.owner_langara_id WHERE oc.copy_id = ${id};
    `;
    con.query(query, function(err, result) {
        info.push(result[0].email);
        if (err) errs = err;
    });
    var query = `
    SELECT u.email AS email FROM SYS_User u INNER JOIN owned_copy oc ON u.langara_id = oc.requested_by_langara_id WHERE oc.copy_id = ${id};
    `;
    con.query(query, function(err, result) {
        info.push(result[0].email);
        if (err) errs = err;
    });
    var query = `
    SELECT b.title AS title FROM book b INNER JOIN owned_copy oc ON oc.book_id = b.isbn13 WHERE oc.copy_id = ${id};
    `;
    con.query(query, function(err, result, fields) {
        info.push(result[0].title);
        if (err) errs = err;
        callback(errs, info);
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

function reqByMe(con, email, callback) {
    var result;
    var query = `
    SELECT OC.copy_id AS copy, OC.owner_langara_id AS bOwner, OC.requested_by_langara_id AS requestedBy, OC.book_price AS bPrice, OC.user_image_url AS bUrl, B.title, B.author
      FROM owned_copy OC INNER JOIN book B ON OC.book_id = B.isbn13
      WHERE OC.requested_by_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}');
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

function reqToMe(con, email, callback) {
    var result;
    var query = `
    SELECT OC.copy_id AS copy, OC.owner_langara_id AS bOwner, OC.requested_by_langara_id AS requestedBy, OC.book_price AS bPrice, OC.user_image_url AS bUrl, B.title, B.author
    FROM owned_copy OC INNER JOIN book B ON OC.book_id = B.isbn13
    WHERE OC.owner_langara_id IN (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}')
    AND OC.requested_by_langara_id IS NOT NULL;
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

function cancelReq(con, id, callback) {
    // Query 8 - Update Operation
    var query = `
    UPDATE owned_copy SET requested_by_langara_id=NULL WHERE copy_id=${id};
    `;
    con.query(query, function(err, result, fields) {
        callback(err, result, fields);
    });
}

module.exports = {
    featuredBooks: featuredBooks,
    requestBook: requestBook,
    myBooks: myBooks,
    deleteBook: deleteBook,
    uploadBook: uploadBook,
    reqByMe: reqByMe,
    cancelReq: cancelReq,
    reqToMe: reqToMe,
    approveRequest: approveRequest
}
