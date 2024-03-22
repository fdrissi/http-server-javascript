module.exports = function formatResponse(headers = [], body) {
  let response = headers.join('\r\n');
  response += '\r\n\r\n';

  if (Boolean(body)) {
    response += `${body}\r\n`;
  }

  return response;
};
