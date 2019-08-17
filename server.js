const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const sesClient = require('./ses-client')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sendmail', async (req, res) => {
  try {
    const to = req.body.to || process.env.DEFAULT_TO
    const from = req.body.from || process.env.DEFAULT_FROM
    const subject = req.body.subject || process.env.DEFAULT_SUBJECT
    const message = req.body.message || process.env.DEFAULT_MESSAGE

    const params = {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      ReturnPath: from,
      Source: from
    }

    await sesClient.ses.sendEmail(params, (err, data) => {
      if (err) {
        res.status(400).json(err.message)
      } else {
        res.json(data)
      }
    })
  } catch (e) {
    res.status(500).send('Something went wrong, sorry!')
  }
})

app.listen(3000, () => {
  console.log('App is listening on port 3000')
})
