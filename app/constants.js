const HTTP_VERSION = 'HTTP/1.1';

module.exports = {
  RESPONSE_STATUSES: {
    TWO_HUNDRED_RESPONSE: `${HTTP_VERSION} 200 OK`,
    TWO_OH_ONE_RESPONSE: `${HTTP_VERSION} 201 Created`,
    FOUR_OH_FOU_RESPONSE: `${HTTP_VERSION} 404 Not Found`,
  },

  CONTENT_TYPES: {
    TEXT_PLAIN: 'Content-Type: text/plain',
    OCTET_STREAM: 'Content-Type: application/octet-stream',
  },
};
