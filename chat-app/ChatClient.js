"use strict";

const net = require("net");
const readline = require("readline");

class ChatClient {
  constructor(hostname, port) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.client = net.connect({ host: hostname, port: port });
    this._onRecieveMessage();
    this._onWriteLine();
  }

  /**
   * Fires when some data is recieved.
   * @private
   */
  _onRecieveMessage() {
    this.client.on("data", data => {
      console.log(data.toString());
    });
  }

  /**
   * Fires when an input is read from the command line.jfjg
   * @private
   */
  _onWriteLine() {
    this.rl.on("line", input => {
      this.client.write(input);
    });
  }
}

module.exports = ChatClient;
