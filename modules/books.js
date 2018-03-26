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

module.exports = {
    featuredBooks: featuredBooks,
    requestBook: requestBook
}