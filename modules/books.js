function featuredBooks(con, num, callback) {
    var result;
    var query = `
        SELECT * FROM ALL_AVAILABLE_BOOKS LIMIT ${num};
    `;
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
    });
}

module.exports = {
    featuredBooks: featuredBooks
}