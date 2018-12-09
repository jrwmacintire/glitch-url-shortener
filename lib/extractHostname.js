function extractHostname(string) {
  console.log(`extractHostname - string: ${string}`);
  const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return 'return string from extractHostname';
}

module.exports = extractHostname;