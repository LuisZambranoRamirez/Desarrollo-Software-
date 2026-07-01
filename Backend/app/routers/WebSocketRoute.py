from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["WebSocket"])


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_json(self, websocket: WebSocket, message: dict):
        await websocket.send_json(message)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager()


@router.websocket("/ws/status")
async def websocket_status(websocket: WebSocket):
    await manager.connect(websocket)
    await manager.send_json(
        websocket,
        {
            "type": "connection",
            "status": "connected",
            "message": "Frontend conectado al backend",
        },
    )

    try:
        while True:
            data = await websocket.receive_json()

            if data.get("type") == "ping":
                await manager.send_json(
                    websocket,
                    {
                        "type": "pong",
                        "status": "ok",
                    },
                )
                continue

            await manager.broadcast(
                {
                    "type": "event",
                    "payload": data,
                }
            )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
