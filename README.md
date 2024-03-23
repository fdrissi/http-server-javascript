[![progress-banner](https://backend.codecrafters.io/progress/http-server/878d2c8f-8aed-4f7f-840e-b9195a077800)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

This is a starting point for JavaScript solutions to the
["Build Your Own HTTP server" Challenge](https://app.codecrafters.io/courses/http-server/overview).

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is the
protocol that powers the web. In this challenge, you'll build a HTTP/1.1 server
that is capable of serving multiple clients.

Along the way you'll learn about TCP servers,
[HTTP request syntax](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html),
and more.

# How to

1. Ensure you have `node (18)` installed locally
1. Run `./your_server.sh` to run your program, which is implemented in
   `app/main.js`.
1. Start sending requests to your server using for example `curl`.

# Routes

There are 5 routes, 4 of them are GET and one is a POST route.

1. `GET: /` return 200.
2. `GET: /echo/<string>` return 200, content-length, and the passed string as the response body.
3. `GET: /user-agent` return 200, parse the user-agent from the request headers and return it as a response body.
4. `GET: /files/<file-name>` return 200, the content of the passed file if exists, if not it return 404.
5. `POST: /files/<file-name>` return 200, create a file with the provided name and the content of it grabs it from the request body.
