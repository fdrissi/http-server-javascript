module.exports = function requestParser(req) {
  const data = req.toString();
  const [allHeaders, ...body] = data.split('\r\n\r\n');
  let [requestLine, ...headers] = allHeaders.split('\r\n');

  headers = headers.reduce((prev, curr) => {
    const [key, value] = curr.split(': ');
    return {
      ...prev,
      [key]: value,
    };
  }, {});

  return {
    requestLine,
    headers,
    body,
  };
};
