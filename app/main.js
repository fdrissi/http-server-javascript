const net = require('net');

function formatResponse(response = []) {
  const res = response.join('\r\n');
  return res;
}

const server = net.createServer((socket) => {
  socket.on('close', () => {
    socket.end();
    server.close();
  });

  socket.on('data', (data) => {
    const requestParts = data.toString().split('\r\n');
    const requestStartLine = requestParts[0];
    const [method, target, httpVersion] = requestStartLine.split(' ');

    if (target === '/') {
      socket.write('HTTP/1.1 200 OK\r\n\r\n');
    } else if (target.includes('/echo/')) {
      const [, text] = target.split('/echo/');
      socket.write(
        formatResponse([
          'HTTP/1.1 200 OK',
          'Content-Type: text/plain',
          `Content-Length: ${text.length}`,
          '',
          text,
        ])
      );
    } else {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    }
  });
});

server.listen(4221, 'localhost');
