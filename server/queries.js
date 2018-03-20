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