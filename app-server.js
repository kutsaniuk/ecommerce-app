
// app-server.js
var express = require('express');
var bodyParser = require('body-parser');  
var stripe = require("stripe")(process.env.STRIPE_SECRET || "sk_test_LFGQnyARiQMR5pAm01cMhsfB");
var app = express();
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname))
app.use(bodyParser.json())
var http = require('http').Server(app)
// Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/charge', (req, res) => {
    var token = req.body.stripeToken;

    // Charge the user's card:
    var charge = stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: req.body.amount.description,
      metadata: req.body.order,
      source: token
    }, function(err, charge) {
        res.send(charge);
    });
});
app.post('/contact', (req, res) => {
    var data = req.body;
    var api_key = process.env.MAILGUN_KEY || 'key-333dec2f4a33beb43527c09b0c028fa7';
    var domain = process.env.MAILGUN_DOMAIN || 'sandbox02c1bc1aa4ad46ab806ab03293fd49b2.mailgun.org';
    if (!api_key || !domain)
        return res.status(500).send({ "status": "error", "message": "You must add a MailGun api key and domain using environment variables located in Your Cosmic JS Bucket > Deploy to Web.  Contact your developer to add these values." });
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain })
    var mailgun_data = {
        from: data.email,
        to: process.env.WORK_EMAIL || 'kutsaniuk@gmail.com',
        subject: 'Contact',
        text: data.text + '\n\n' + data.name
    };
    mailgun.messages().send(mailgun_data, function (error, body) {
        if (error)
            return res.status(500).send({ "status": "error", "message": "You must add a MailGun api key and domain using environment variables located in Your Cosmic JS Bucket > Deploy to Web.  Contact your developer to add these values." });
        
        return res.status(200).send({"status": "success"});
    })
});
http.listen(app.get('port'), () => {
  console.log('Ecommerce App listening on ' + app.get('port'))
});