const mongoose = require('mongoose');
require('../models/UrlObject');
const UrlObject = mongoose.model('UrlObject');
const app = require('../server');

async function checkDatabase(string) {
  const url = await UrlObject.findOne({ originalUrl: string });
  if(url) {
    console.log('Item exists in DB');
  } else {
    console.log('Item does not exist in the DB'); 
    return string;
  }
}

module.exports = checkDatabase;