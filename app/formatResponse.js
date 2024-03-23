const CRLF = '\r\n';

module.exports = function formatResponse(headers = [], body) {
  let response = headers.join(CRLF);
  response += CRLF + CRLF;

  if (Boolean(body)) {
    response += `${body}${CRLF}`;
  }

  return response;
};
