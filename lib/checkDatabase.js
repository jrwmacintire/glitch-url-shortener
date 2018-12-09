const mongoose = require('mongoose');
const shortid = require('shortid');
require('../models/UrlObject');
const UrlObject = mongoose.model('UrlObject');

async function checkDatabase(string) {
  console.log('Inside checkDatabase');
  try {
    const url = await UrlObject.findOne({ originalUrl: string });
    if(url) {
      console.log('item in DB');
    } else {
      const shortCode = shortid.generate(),
            baseUrl = 'https://jrwm3-url-shortener.glitch.me/api/shorturl/',
            shortUrl = baseUrl + shortCode,
            createdAt = new Date(),
            updatedAt = new Date();
          
      const item = UrlObject({
        string,
        shortUrl,
        shortCode,
        createdAt,
        updatedAt
      });
          
      console.log('Saving item to DB!');
      await item.save();
    }
  } catch(err) {
    return err;
  }
}

module.exports = checkDatabase;