function extractHostname(string) {
  console.log(`extractHostname - string: ${string}`);
  
  try {
    const urlRegExp = /^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i,
          matches = string.match(urlRegExp),
          hostname = matches[1];
          
    console.log(`hostname: ${hostname}`);
    
    return hostname;
  } catch(err) {
    return
  }
}

module.exports = extractHostname;