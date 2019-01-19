const axios = require('axios')
const users = require('./db/userModel')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.CRYPTR_SECRET)
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prosescriptapp@gmail.com',
    pass: process.env.GMAIL_PW
  }
})

create = (user_id, access_token, mailObj) => {
  axios({
    method: 'post',
    url: `https://api.medium.com/v1/users/${user_id}/posts`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Charset': 'utf-8'
    },
    data: {
      contentFormat: 'html', // or Markdown
      title: mailObj.title,
      content: mailObj.html,
      publishStatus: 'public',
      notifyFollowers: true
    }
  })
    .then(res => {
      console.log(res.data)
      transporter.sendMail(
        {
          from: 'prosescriptapp@gmail.com',
          to: `${mailObj.email}`,
          subject: 'Your writing has been posted',
          html: `You can access your post here: ${res.data.data.url}`
        },
        function(err, info) {
          if (err) console.log(err)
          else console.log(info)
        }
      )
    })
    .catch(err => console.log(err))
}

refresh = (refresh_token, client_id, client_secret, mailObj) => {
  axios({
    method: 'post',
    url: 'https://api.medium.com/v1/tokens',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'Accept-Charset': 'utf-8'
    },
    data: `refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=refresh_token`
  })
    .then(res => {
      const { access_token, expires_at } = res.data
      const encrypted_access = cryptr.encrypt(access_token)

      users
        .update(mailObj.email, encrypted_access, expires_at)
        .then(res => {
          users
            .getByEmail(mailObj.email)
            .then(res => {
              const { access_token, user_id } = res
              const decrypted_access = cryptr.decrypt(access_token)
              create(user_id, decrypted_access, mailObj)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports = { create, refresh }
