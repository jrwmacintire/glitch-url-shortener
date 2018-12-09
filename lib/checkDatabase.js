const mongoose = require('mongoose');
require('../models/UrlObject');
const UrlObject = mongoose.model('UrlObject');
const app = require('../server');

async function checkDatabase(string) {
  const url = await UrlObject.findOne({ originalUrl: string });
  if(url) {
    return 'Item exists in DB';
  } else {
    return 'Item does not exist in the DB'; 
  }
}

module.exports = checkDatabase;