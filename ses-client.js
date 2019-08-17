const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

module.exports = { ses }
