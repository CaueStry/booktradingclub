function getMyProfile(con, email, callback) {
    var user = {user: [], books: []};
    var query = `
        SELECT langara_id, first_name, last_name, email FROM sys_user
        WHERE langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}');
    `;

    con.query(query, function(err, result, fields) {
        user.personal = result[0];
        query = `
        SELECT b.title FROM owned_copy oc INNER JOIN book b ON oc.book_id = b.isbn13 WHERE oc.owner_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}') AND b.title NOT IN (SELECT b.title FROM owned_copy oc INNER JOIN book b ON oc.book_id = b.isbn13 WHERE oc.owner_langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}') AND
        oc.requested_by_langara_id IS NOT NULL);
        `;
        con.query(query, function(err, result, fields) {
            user.books = result;
            callback(user);
        });
    });
}

function deleteAccount(con, email, callback) {
    var query = `
    DELETE FROM sys_user WHERE email = '${email}';
    `;
    con.query(query, function(err, result, fields) {
        callback(err);
    });
}

module.exports = {
    getMyProfile: getMyProfile,
    deleteAccount: deleteAccount
}