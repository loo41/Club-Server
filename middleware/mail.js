const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const mailInfo = {
    host: '', user: '', pass: ''
}
const sendMails = (mail, html, clubName = 'TJCU-阳光网站', subject = '招新') => {
  let transporter = nodemailer.createTransport(smtpTransport({
      host: mailInfo.host || "smtp.163.com",
      secureConnection: true,
      port: 465,
      auth: {
          user: mailInfo.user,
          pass: mailInfo.pass,
      }
  }));
  let sendmail = () => {
      var option = {
          from: `${clubName}<${mailInfo.user}>`,
          to: `${mail}`,
          headers: {
              "X-Mailer": "Microsoft Outlook Express 6.00.2900.2869"
          },
          date: new Date()
      }
      option.subject = subject
      option.html = html
      transporter.sendMail(option, function(error, response){
          if(error) {
              console.log("fail: " + error)
          } else {
              console.log("success:" + response.response)
          }
      });
  }
  sendmail()
}

module.exports = {
  sendMails
}