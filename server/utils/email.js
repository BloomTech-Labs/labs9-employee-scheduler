const nodemailer = require('nodemailer')

const username = process.env.GMAIL_USERNAME
const password = process.env.GMAIL_PASSWORD
const clientUrl = process.env.CLIENT_URL

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password
  }
})

const sendInvite = (email, inviteId) => {
  transporter
    .sendMail({
      from: username,
      to: `${email}`,
      subject: 'Invite link',
      html: `You have been invited to join the app. Would you like to? <br><br> Click this link to sign up: ${clientUrl}/join/${inviteId}`
    })
    .then(res => 'return success')
    .catch(err => 'returned with error')
}

module.exports = sendInvite
