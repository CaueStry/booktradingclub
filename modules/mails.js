var nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mail.booktradingclub@gmail.com',
        pass: 'CPSC2221'
    }
});

function requestApproved(info) {
    var mailOptions = {
        from: 'mail.booktradingclub@gmail.com',
        to: info[1],
        subject: `Your request for the book "${info[2]}" was approved.`,
        text: `Your request for the book "${info[2]}" was approved. Contact the owner on the following e-mail: ${info[0]}`
    }
    mail.sendMail(mailOptions);
    mailOptions = {
        from: 'mail.booktradingclub@gmail.com',
        to: info[0],
        subject: `Your approved request for the book "${info[2]}".`,
        text: `Your approval for your book "${info[2]}" was successfull! Contact the buyer on the following e-mail: ${info[1]}`
    }
    mail.sendMail(mailOptions);
}

module.exports = {
    requestApproved: requestApproved
}