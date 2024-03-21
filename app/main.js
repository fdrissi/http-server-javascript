const net = require('net');
const formatResponse = require('./formatResponse');
const requestParser = require('./requestParser');
const routes = require('./routes');

const TWO_HUNDRED_RESPONSE = 'HTTP/1.1 200 OK';
const FOUR_OH_FOU_RESPONSE = 'HTTP/1.1 404 Not Found';

const server = net.createServer((socket) => {
  socket.on('close', () => {
    socket.end();
    // server.close();
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
