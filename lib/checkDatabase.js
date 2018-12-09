const mongoose = require('mongoose');
require('../models/UrlObject');
const UrlObject = mongoose.model('UrlObject');

async function checkDatabase(string) {
  try {
    const url = await UrlObject.findOne({ originalUrl: string });
    if(url) {
      return 'Item exists in DB';
    } else {
      return 'Item does not exist in the DB'; 
    }
  } catch(err) {
    return err;
  }
}

module.exports = checkDatabase;