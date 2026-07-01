const AmiEventListener = require("./AmiEventListener");

const ami = new AmiEventListener({
  host: "127.0.0.1",      
  port: 5038,
  username: "orus",
  secret: "drakotako1234",
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
  console.log(event)
  console.log("-------------------------------------------------")
});

ami.on("BridgeCreate", (event) => {
  console.log("🔗 Llamada conectada:", event.Channel1, "<->", event.Channel2);
  console.log(event)
  console.log("-------------------------------------------------")
});


ami.on("Hangup", (event) => {
  console.log("📴 Hangup:", event.Channel, "Cause:", event.Cause);
    console.log(event)
  console.log("-------------------------------------------------")
});

// --- Errores ---
ami.on("error", (err) => {
  console.error("❌ Error AMI:", err.message);
});

// Iniciar conexión
ami.connect();