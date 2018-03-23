module.exports = {

    crypto: require("crypto"),

    sha512: function(password, salt) {
        var hash = this.crypto.createHmac("sha512", salt);
        hash.update(password);
        var value = hash.digest("hex");
        return value;
    },

    generateSalt: function() {
        var salt = this.crypto.randomBytes(64).toString("hex");
        return salt;
    },

    checkPassword: function(attemptPassword, originalPassword, salt) {
        if(originalPassword == sha512(attemptPassword, salt)) {
            return true;
        }
        return false;
    }

}