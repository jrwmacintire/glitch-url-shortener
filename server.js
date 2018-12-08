'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('Connected to database!');
});

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
  res.send(body);
  // read URL from 'body'
  // check if URL is valid using 'dns' module
  // if invalid, respond with error message
});

// @route GET '/api/shorturl/:shortUrl'
// @desc Redirects to the original URL associated with the current short URL
app.get('/api/shorturl/:shortUrl', (req, res) => {
  console.log(`Redirecting from '${req.params.shortUrl}' to ...`);
});


app.listen(port, () => {
  console.log('URL Shortener is listening ...');
});