const AmiEventListener = require("./AmiEventListener");

const ami = new AmiEventListener({
  host: "127.0.0.1",      // IP de tu FreePBX/Asterisk
  port: 5038,
  username: "miusuario",
  secret: "miPasswordFuerte",
  reconnectDelay: 5000,
  keepAliveInterval: 15000,
});

// --- Eventos de conexión ---
ami.on("connected", () => {
  console.log("✅ Conectado a AMI");
});

ami.on("disconnected", () => {
  console.log("⚠️ Desconectado de AMI");
});

ami.on("reconnecting", () => {
  console.log("♻️ Reconectando...");
});

// --- Eventos telefónicos típicos ---
ami.on("Newchannel", (event) => {
  console.log("📞 Nueva llamada:", event.Channel, event.CallerIDNum);
});

ami.on("Dial", (event) => {
  console.log("🔔 Dial:", event.Source, "→", event.Destination);
});

ami.on("Bridge", (event) => {
  console.log("🔗 Llamada conectada:", event.Channel1, "<->", event.Channel2);
});

ami.on("Hangup", (event) => {
  console.log("📴 Hangup:", event.Channel, "Cause:", event.Cause);
});

// --- Errores ---
ami.on("error", (err) => {
  console.error("❌ Error AMI:", err.message);
});

// Iniciar conexión
ami.connect();