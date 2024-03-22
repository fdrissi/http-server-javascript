const { readFile } = require('node:fs/promises');
const formatResponse = require('./formatResponse');
const { join } = require('node:path');
const { access, constants, existsSync } = require('node:fs');
const path = require('node:path');

const RESPONSE_STATUSES = {
  TWO_HUNDRED_RESPONSE: 'HTTP/1.1 200 OK',
  FOUR_OH_FOU_RESPONSE: 'HTTP/1.1 404 Not Found',
};

const CONTENT_TYPES = {
  TEXT_PLAIN: 'Content-Type: text/plain',
  OCTET_STREAM: 'Content-Type: application/octet-stream',
};

const ROUTES = {
  GET: {
    '/': mainRouteHandler,
    '/echo': echoRouteHandler,
    '/user-agent': userAgentHandler,
    '/files': filesHandler,
  },
};

// GET: /
function mainRouteHandler(req, res) {
  res.write(`${RESPONSE_STATUSES.TWO_HUNDRED_RESPONSE}\r\n\r\n`);
}

// GET: /echo/<string>
function echoRouteHandler(req, res) {
  const {
    requestLine: {
      target: { urlParams: body },
    },
  } = req;

  res.write(
    formatResponse(
      [
        RESPONSE_STATUSES.TWO_HUNDRED_RESPONSE,
        CONTENT_TYPES.TEXT_PLAIN,
        `Content-Length: ${body.length}`,
      ],
      body
    )
  );
}

// GET: /user-agent
function userAgentHandler(req, res) {
  const { headers } = req;
  const userAgent = headers['User-Agent'];

  res.write(
    formatResponse(
      [
        RESPONSE_STATUSES.TWO_HUNDRED_RESPONSE,
        CONTENT_TYPES.TEXT_PLAIN,
        `Content-Length: ${userAgent.length}`,
      ],
      userAgent
    )
  );
}

// GET: /files
async function filesHandler(req, res) {
  const {
    requestLine: {
      target: { urlParams: fileName },
    },
  } = req;
  const directory = process.argv[2] === '--directory' ? process.argv[3] : null;
  const filePath = path.resolve(path.join(directory, fileName));
  console.log(filePath);

  if (existsSync(filePath)) {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    res.write(
      formatResponse(
        [
          RESPONSE_STATUSES.TWO_HUNDRED_RESPONSE,
          CONTENT_TYPES.OCTET_STREAM,
          `Content-Length: ${contents.length}`,
        ],
        contents
      )
    );
  } else {
    res.write(
      formatResponse([
        RESPONSE_STATUSES.FOUR_OH_FOU_RESPONSE,
        CONTENT_TYPES.OCTET_STREAM,
      ])
    );
  }
  return res.end();
}

function routeNotFoundHandler(req, res) {
  res.write(`${RESPONSE_STATUSES.FOUR_OH_FOU_RESPONSE}\r\n\r\n`);
}

module.exports = (res) => {
  return (req) => {
    const {
      requestLine: {
        method,
        target: { route },
      },
    } = req;

    if (!ROUTES[method].hasOwnProperty(route)) {
      return routeNotFoundHandler(req, res);
    }

    const handler = ROUTES[method][route];
    return handler(req, res);
  };
};
