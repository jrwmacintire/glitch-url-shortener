const mongoose = require('mongoose');
const urlSchema = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  shortCode: String,
  createdAt: { type: Date, date: Date.now },
  updatedAt: { type: Date, date: Date.now }
});

const UrlObject = mongoose.model('UrlObject', urlSchema);

module.exports = UrlObject;