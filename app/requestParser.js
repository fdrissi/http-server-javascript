module.exports = function requestParser(req) {
  const data = req.toString();
  const [allHeaders, ...body] = data.split('\r\n\r\n');
  let [requestLine, ...headers] = allHeaders.split('\r\n');
  const [method, target, httpVersion] = requestLine.split(' ');

  headers = headers.reduce((prev, curr) => {
    const [key, value] = curr.split(': ');
    return {
      ...prev,
      [key.trim()]: value.trim(),
    };
  }, {});

  const [, route, ...params] = target.split('/');
  const urlParams = params.join('/');

  return {
    requestLine: {
      method,
      target: {
        route: `/${route}`,
        urlParams,
      },
      httpVersion,
    },
    headers,
    body,
  };
};
