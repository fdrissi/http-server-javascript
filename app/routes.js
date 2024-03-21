const formatResponse = require('./formatResponse');
const requestParser = require('./requestParser');

const TWO_HUNDRED_RESPONSE = 'HTTP/1.1 200 OK';
const FOUR_OH_FOU_RESPONSE = 'HTTP/1.1 404 Not Found';

const ROUTES = {
  GET: {
    '/': mainRouteHandler,
    '/echo': echoRouteHandler,
    '/user-agent': userAgentHandler,
  },
};

// GET: /
function mainRouteHandler(req, res) {
  res.write(`${TWO_HUNDRED_RESPONSE}\r\n\r\n`);
}

// GET: /echo/<string>
function echoRouteHandler(req, res) {
  const { requestLine } = requestParser(req);
  const [, target] = requestLine.split(' ');
  const [, body] = target.split('/echo/');
  res.write(
    formatResponse(
      [
        TWO_HUNDRED_RESPONSE,
        'Content-Type: text/plain',
        `Content-Length: ${body.length}`,
      ],
      body
    )
  );
}

function userAgentHandler(req, res) {
  const { headers } = requestParser(req);
  const userAgent = headers['User-Agent'];
  console.log(userAgentHandler.name, headers, userAgent);
  res.write(
    formatResponse(
      [
        TWO_HUNDRED_RESPONSE,
        'Content-Type: text/plain',
        `Content-Length: ${userAgent.length}`,
      ],
      userAgent
    )
  );
}

function defaultHandler(req, res) {
  res.write(`${FOUR_OH_FOU_RESPONSE}\r\n\r\n`);
}

module.exports = (res) => {
  return (req, method, route) => {
    if (!ROUTES[method].hasOwnProperty(route)) {
      return defaultHandler(req, res);
    }

    const handler = ROUTES[method][route];
    return handler(req, res);
  };
};
