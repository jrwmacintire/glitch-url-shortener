const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const shortid = require('shortid');
require('../models/UrlObject');
const UrlObject = mongoose.model('UrlObject');

async function checkDatabase(originalUrl) {
  console.log('Inside checkDatabase');
  
  const shortCode = shortid.generate(),
        baseUrl = 'https://jrwm3-url-shortener.glitch.me/api/shorturl/',
        shortUrl = baseUrl + shortCode,
        createdAt = new Date(),
        updatedAt = new Date();
  
  const url = await UrlObject.findOne({ originalUrl: originalUrl }, (err, obj) => {
    console.log(obj);
  });
  
}

module.exports = checkDatabase;