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
const extractHostname = require('./lib/extractHostname');

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
app.post('/api/shorturl/new', async (req, res) => {
  const originalUrl = req.body.url;
  console.log(`originalUrl: ${originalUrl}`);
 
  const hostname = extractHostname(originalUrl);
  // console.log(`hostname: ${hostname}`);
  
  const shortCode = shortid.generate(),
        baseUrl = 'https://jrwm3-url-shortener.glitch.me/api/shorturl/',
        shortUrl = baseUrl + shortCode,
        createdAt = new Date(),
        updatedAt = new Date();
  
  try {
    
    const url = await UrlObject.findOne({ originalUrl: originalUrl });
    
    const responseData = {
      originalUrl: originalUrl,
      shortUrl: shortCode
    };
    
    if(url) {
      console.log('item in DB');
      return res.status(200).send({ message: 'item found in DB.' });
    } else {
      console.log('item should be added to DB');
      return res.status(200).send(responseData);
    }
    
  } catch (err) {
    return res.status(401).send({ error: 'Error finding item in DB.' });
  }
  
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

module.exports = app;