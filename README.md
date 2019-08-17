# Amazon SES Relay Docker Container

## Introduction

> An easy way to add an SES endpoint to your docker applications to send transactional emails. Uses traefik for domain and SSL, however can be used as a standalone image.

## Code Samples

> You can set default from/to/subject/message inside the `docker-compose.yml` file. This is useful if you are sending notification emails to yourself. Otherwise, you can simply POST a json object to your endpoint in the following format:
```
{
    "to": "recpipient@email.com",
    "from": "Your Name <you@email.com>",
    "subject": "This is a cool subject, you should totally open this email!",
    "message": "<h1>Hey!</h1>This is the body of the email. I support html too! <br /><br />Thanks for reading!"
}
```
> All arguments are optional, and will be replaced with the defaults set up in your `docker-compose.yml` if there are no defaults and no arguments supplied, you will receive an error.
> The `from` parameter <strong>must</strong> wrap the email in < > tags.

## Installation

> If you wish to use traefik, ensure you set up your email address and required domain for the endpoint. Note that you must POST the data to the /sendmail URI

> Run standalone, or inside your existing Docker setup. If you intend to use with traefik/https, make sure you run `chmod 600 acme.json` on your server <strong>before</strong> you run `docker-compose up`.

> The 'from' domain <strong>must</strong> be a verified SES domain for your account.

> You can run locally to test your configuration by running 
`AWS_KEY='XXXX' AWS_SECRET='xxx' AWS_REGION='xx-xxxx-x' node server.js ` 
Then simply POST (using postman or curl) to http://localhost:3000/sendmail

## Thanks to
> This was me following https://attacomsian.com/blog/amazon-ses-integration-nodejs and then figuring out how to make it a docker image for my own learning.