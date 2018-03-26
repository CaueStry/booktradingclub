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

function requestBook(con, email, callback) {
    var query = ``;
    con.query(query, function(err, result, fields) {
        callback(err, result, fields);
    });
}

module.exports = {
    featuredBooks: featuredBooks
}