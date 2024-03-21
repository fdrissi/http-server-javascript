const net = require('net');

// Uncomment this to pass the first stage
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
    } else {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    }
  });
});

server.listen(4221, 'localhost');
