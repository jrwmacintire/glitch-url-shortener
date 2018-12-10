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
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err, db) => {
  console.log('Connected to database!');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
  
  const baseUrl = 'https://jrwm3-url-shortener.glitch.me/api/shorturl/',
        createdAt = new Date(),
        updatedAt = new Date();
  
  let shortCode = shortid.generate(),
      shortUrl = baseUrl + shortCode;
  
  try {
    
    const url = await UrlObject.findOne({ originalUrl: originalUrl }, (err, obj) => {
      if(err) res.status(401).send(err);
      // If the object already exists, add object's shortCode
      if(obj) {
        shortCode = obj.shortCode;
        shortUrl = baseUrl + shortCode;
        // console.log(shortUrl);
      }
    });
    
    const item = new UrlObject({
      originalUrl,
      shortUrl,
      shortCode,
      createdAt,
      updatedAt
    });
    
    if(!url) {
      console.log('adding item to DB');
      await item.save();
    }
    
    return res.status(200).send({
      originalUrl: originalUrl,
      shortUrl: shortCode
    });
    
  } catch (err) {
    return res.status(401).send({ error: 'Error finding item in DB.' });
  }
  
});

// @route GET '/api/shorturl/:shortUrl'
// @desc Redirects to the original URL associated with the current short URL
app.get('/api/shorturl/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(`Redirecting from '${shortUrl}' to ...`);
  
  const url = await UrlObject.findOne({ shortCode: shortUrl }, (err, obj) => {
    if(err) return res.status(401).send({ error: 'Error finding object in DB.' });
    // console.log(obj);
    return res.redirect(obj.originalUrl);
  });
  
});


app.listen(port, () => {
  console.log('URL Shortener is listening ...');
});

module.exports = app;