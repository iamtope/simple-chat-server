"use strict";

const net = require("net");

class ChatServer {
  constructor(port) {
    this.connections = [];
    // TODO finish this: Do not forget the error on event.
    this.server = this._manageChatEvents(port);
  }

  /**
   * Broadcast the message to all the users.
   * @param { Object } from  - The socket server object.
   * @param { String } message  - The socket server object
   */
  _broadcast(from, message) {
    this.connections.forEach(userConnection => {
       userConnection.write(message);
    });
  }

  /**
   * Manages all connection events.
   * @param { Number } port - The server port.
   * @returns { Object } The socket server object.
   */
  _manageChatEvents(port) {
    const server = net.Server(userConnection => {
      userConnection.write("Welcome to the chat room. Say anything you like.");
      this.connections.push(userConnection);
      this._onMessage(userConnection);
      this._onUserDisconnect(userConnection);
      this._onError(userConnection);
    });
    this._listen(port, server);
    return server;
  }

  /**
   * Listens for connections.
   * @private
   * @param { Number } port - The server port.
   * @param { Object } userConnection - A user connection object.
   */
  _listen(port, server) {
    server.listen(port, () => {
      console.log(`Accepting connections on port: ${port}`);
    });
  }

  /**
   * Recieves message from a user and broadcasts it to the group.
   * @private
   * @param { Object } userConnection - A user connection object.
   */
  _onMessage(userConnection) {
    userConnection.on("data", message => {
      const data = message.toString();
      this._broadcast(userConnection, data);
    });
  }

  /**
   * Fires when an error occurs with a connection.
   * @private
   * @param { Object } userConnection - A user connection object.
   */
  _onError(userConnection) {
    userConnection.on("error", error => {
      console.log(error.message);
    });
  }

  /**
   * Fires when a connection ends.
   * @private
   * @param { Object } userConnection - A user connection object.
   */
  _onUserDisconnect(userConnection) {
    userConnection.on("end", event => {
        this.connections.splice(userConnection, 1);
      this._broadcast(userConnection, "Someone has just left us.");
    });
  }

  /**
   * Close the connection.
   */
  close() {
    this.connections.forEach(conn => {
      conn.destroy();
    });
    this.server.close();
  }
}

module.exports = ChatServer;
