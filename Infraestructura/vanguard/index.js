const AmiEventListener = require("./AmiEventListener");

const ami = new AmiEventListener({
  host: "127.0.0.1",      
  port: 5038,
  username: "orus",
  secret: "drakotako1234",
  reconnectDelay: 5000,
  keepAliveInterval: 15000,
});

const SERVIDOR_IP = "192.168.0.253";
const PUERTO = 3000;
const RUTA = "/api/llamadas";

const EVENTOS_URL = `http://${SERVIDOR_IP}:${PUERTO}${RUTA}`;

// --- Eventos de conexión ---
ami.on("connected", () => {
  console.log("Conectado a AMI");
});

ami.on("disconnected", () => {
  console.log("Desconectado de AMI");
});

ami.on("reconnecting", () => {
  console.log("Reconectando...");
});

// --- Eventos telefónicos típicos ---
ami.on("Newchannel", (event) => {
  console.log("Nueva llamada:", event.Channel, event.CallerIDNum);
  console.log(event)
  console.log("-------------------------------------------------")
});

ami.on("BridgeCreate", (event) => {
  console.log("Llamada entrante:", event.Channel1, "<->", event.Channel2);
  console.log(event)
  console.log("-------------------------------------------------")
});

ami.on("BridgeEnter", (event) => {
  console.log("Llamada conectada:", event.Channel1, "<->", event.Channel2);
  console.log(event)
  console.log("-------------------------------------------------")

  try {
  const response = await fetch(EVENTOS_URL, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        evento: event.Event,
        linkedId: event.Linkedid,
        callerId: event.CallerIDNum,
        connectedLineName: event.ConnectedLineName
      })
  });

    console.log("Estado:", response.status);
  } catch (err) {
    console.error("Error:", err.message);
  }
});

ami.on("Hangup", async (event) => {
  console.log("Hangup:", event.Channel, "Cause:", event.Cause);
  console.log(event);
  console.log("-------------------------------------------------");

  try {
    const response = await fetch(EVENTOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        linkedId: event.Linkedid,
        evento: event.Event        
      })
    });

    console.log("Estado:", response.status);
  } catch (err) {
    console.error("Error:", err.message);
  }
});

// --- Errores ---
ami.on("error", (err) => {
  console.error("Error AMI:", err.message);
});

// Iniciar conexión
ami.connect();