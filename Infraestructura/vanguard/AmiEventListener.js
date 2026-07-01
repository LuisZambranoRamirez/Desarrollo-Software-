const net = require("net");
const EventEmitter = require("events");

class AmiEventListener extends EventEmitter {
  constructor(config) {
    super();

    this.host = config.host;
    this.port = config.port || 5038;
    this.username = config.username;
    this.secret = config.secret;

    this.socket = null;
    this.buffer = "";
    this.connected = false;

    this.reconnectDelay = config.reconnectDelay || 5000;
    this.keepAliveInterval = config.keepAliveInterval || 15000;
    this.keepAliveTimer = null;
  }

  connect() {
    this.socket = new net.Socket();

    this.socket.connect(this.port, this.host, () => {
      this.connected = true;
      this.emit("connected");
      this.login();
      this.startKeepAlive();
    });

    this.socket.on("data", (data) => { 
        console.log(data.toString);
        this.onData(data)});
    this.socket.on("close", () => this.onDisconnect());
    this.socket.on("error", (err) => this.emit("error", err));
  }

  login() {
    this.writeAction({
      Action: "Login",
      Username: this.username,
      Secret: this.secret,
      Events: "on", // <- clave para recibir eventos
    });
  }

  writeAction(obj) {
    if (!this.socket || !this.connected) return;

    let msg = "";
    for (const key in obj) {
      msg += `${key}: ${obj[key]}\r\n`;
    }
    msg += "\r\n";

    this.socket.write(msg);
  }

  onData(data) {
    this.buffer += data.toString();

    const packets = this.buffer.split("\r\n\r\n");
    this.buffer = packets.pop();

    for (const packet of packets) {
      const event = this.parsePacket(packet);

      if (event.Event) {
        this.emit(event.Event, event);
      } else {
        this.emit("response", event);
      }
    }
  }

  parsePacket(packet) {
    const lines = packet.split("\r\n");
    const obj = {};

    for (const line of lines) {
      const index = line.indexOf(":");
      if (index > -1) {
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();
        obj[key] = value;
      }
    }

    return obj;
  }

  startKeepAlive() {
    this.keepAliveTimer = setInterval(() => {
      this.writeAction({ Action: "Ping" });
    }, this.keepAliveInterval);
  }

  onDisconnect() {
    this.connected = false;
    this.emit("disconnected");

    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
    }

    setTimeout(() => {
      this.emit("reconnecting");
      this.connect();
    }, this.reconnectDelay);
  }

  disconnect() {
    if (this.socket) {
      this.socket.destroy();
    }
    this.connected = false;
  }
}

module.exports = AmiEventListener;