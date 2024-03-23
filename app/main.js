const net = require('net');
const requestParser = require('./requestParser');
const routes = require('./routes');

const server = net.createServer((socket) => {
  const router = routes(socket);

  socket.on('close', () => {
    socket.end();
  });

  socket.on('data', (data) => {
    const { requestLine, headers, body } = requestParser(data);

    const request = {
      raw: data,
      requestLine,
      headers,
      body,
    };

    router(request);
  });
});

server.listen(4221, 'localhost');
