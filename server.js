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

// app.use(express.json());
// app.use(express.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// @route POST '/api/shorturl/new'
// @desc Create a new shorturl using the POST request's query
app.post('/api/shorturl/new',(req, res) => {
  let body = req.body;
  // res.send(body);
  const url = body.url;
  dns.lookup(url, async function(err, address, family) {
    if(err) {
      res.status(400).json({ error: 'Invalid URL' });
    } else {
      // console.log(`address: ${address}`);
      const shortCode = shortid.generate(),
            baseUrl = 'https://jrwm3-url-shortener.glitch.me/api/shorturl/',
            shortUrl = baseUrl + shortCode,
            createdAt = new Date(),
            updatedAt = new Date();
      
      try {
        const url = await UrlObject.findOne({ originalUrl: originalUrl });
      } catch(err) {
         res.status(400).send({ error: 'Error finding object in database.' }); 
      }
    }
  });
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