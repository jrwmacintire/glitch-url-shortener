function extractHostname(string) {
  // console.log(`extractHostname - string: ${string}`);
  try {
    const urlRegExp = /^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i,
          matches = string.match(urlRegExp);
    let hostname;
    
    if(matches && matches.length >= 2) {
      hostname = matches[1];
      console.log(`hostname: ${hostname}`);
      return hostname;
    } else {
      return { error: '(extractHostname) Invalid URL format.' };
    }
    
  } catch(err) {
    throw err;
  }
}

module.exports = extractHostname;