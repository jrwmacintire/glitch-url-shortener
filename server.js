'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('./models/UrlObject');
const UrlObject = mongoose.model('UrlObject');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const shortid = require('shortid');
const dns = require('dns');

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log('Connected to database!');
});
mongoose.Promise = global.Promise;

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// @route POST '/api/shorturl/new'
// @desc Create a new shorturl using the POST request's query
app.post('/api/shorturl/new',(req, res) => {
  let body = req.body;
  // res.send(body);
  const originalUrl = body.url;
  console.log(`originalUrl: ${originalUrl}`);
  
  const urlRegExp = /^(https*:\/\/)(\w*)$/;
  console.log(originalUrl.replace(urlRegExp, '$1 $2'));
  
  const dnsLookup = dns.lookup(originalUrl, (err, address, family) => {
    if(err) {
      res.status(401).send({ error: 'Invalid URL format.' });
    } else {
      console.log('Valid URL?');
      
      res.status(200).json({
        originalUrl: originalUrl,
        shortUrl: 'something short'
      });
    }
  });
  console.log(`dnsLookup: `, dnsLookup);
});

// @route GET '/api/shorturl/:shortUrl'
// @desc Redirects to the original URL associated with the current short URL
app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(`Redirecting from '${shortUrl}' to ...`);
  
});


app.listen(port, () => {
  console.log('URL Shortener is listening ...');
});