module.exports = function formatResponse(headers = [], body) {
  let response = headers.join('\r\n');
  response += '\r\n\r\n';

  if (Boolean(body)) {
    response += `${body}\r\n`;
  }

  console.log('response', response);

  return response;
};
