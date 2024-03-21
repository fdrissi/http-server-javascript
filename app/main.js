const net = require('net');
const requestParser = require('./requestParser');
const routes = require('./routes');

const server = net.createServer((socket) => {
  socket.on('close', () => {
    socket.end();
  });

  socket.on('data', (data) => {
    const router = routes(socket);
    const { requestLine, headers, body } = requestParser(data);
    const [method, target, httpVersion] = requestLine.split(' ');

    if (target === '/') {
      router(data, method, '/');
    } else if (target.includes('/echo')) {
      router(data, method, '/echo');
    } else {
      router(data, method, target);
    }
  });
});

server.listen(4221, 'localhost');
