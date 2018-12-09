const mongoose = require('mongoose');
const UrlSchema = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  shortCode: String,
  createdAt: { type: Date, date: Date.now },
  updatedAt: { type: Date, date: Date.now }
});

mongoose.model('UrlObject', UrlSchema);

module.exports = UrlSchema;