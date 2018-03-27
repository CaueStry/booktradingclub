function getMyProfile(con, email, callback) {
    var query = `
        SELECT langara_id, first_name, last_name, email FROM sys_user
        WHERE langara_id = (SELECT langara_id FROM sys_user WHERE sys_user.email='${email}');
    `;

    con.query(query, function(err, result, fields) {
        callback(result[0]);
    });
}

module.exports = {
    getMyProfile: getMyProfile
}