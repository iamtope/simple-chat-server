const ChatClient = require("./ChatClient"),
  hostname = process.argv[2],
  port = process.argv[3];
if (!hostname) {
  throw Error("A port must be provided");
}

if (!port) {
  throw Error("A port must be provided");
}

let client = new ChatClient(hostname, port);
