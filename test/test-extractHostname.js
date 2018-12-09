const assert = require('assert');
const extractHostname = require('../lib/extractHostname');

describe('extractHostname.js', () => {
  
  it('returns valid hostname from valid URL.', () => {
    const url = 'https://www.google.com';
    const result = extractHostname(url);
    assert.equal(result, 'google.com');
  });
  
  it('returns error when URL lacks protocol', () => {
    const url = 'google.com';
    const result = extractHostname(url);
    assert.equal(result, { error: 'invalid URL format.' });
  });
  
});