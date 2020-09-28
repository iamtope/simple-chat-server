const ChatServer = require('./ChatServer'),
    port = process.argv[2];


if (!port) {
  throw Error(`You must provide a port for the chat server!`);
}

let server = new ChatServer(port);