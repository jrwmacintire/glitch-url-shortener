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
  
  try {
    const url = await UrlObject.findOne({ originalUrl: originalUrl });
    
    if(url) {
      console.log('item in DB');
    } else {    
      const item = new UrlObject({
        originalUrl,
        shortUrl,
        shortCode,
        createdAt,
        updatedAt
      });
          
      console.log('Saving item to DB!');
      await item.save();
      
      const responseData = {
        originalUrl: originalUrl,
        shortUrl: shortCode
      };
      
      return responseData;
      
    }
  } catch(err) {
    return err;
  }
  
}

module.exports = checkDatabase;