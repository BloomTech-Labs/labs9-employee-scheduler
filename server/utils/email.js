const nodemailer = require('nodemailer')

const username = process.env.GMAIL_USERNAME
const password = process.env.GMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password
  }
})

const sendInvite = email => {
  transporter
    .sendMail({
      from: username,
      to: `${email}`,
      subject: 'Invite link',
      html: `You have been invited to join the app. Would you like to?`
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

module.exports = sendInvite
