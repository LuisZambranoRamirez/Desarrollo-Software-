import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const RealtimeContext = createContext(null);

const getDefaultSocketUrl = () => {
  if (import.meta.env.VITE_BACKEND_WS_URL) {
    return import.meta.env.VITE_BACKEND_WS_URL;
  }

  return 'ws://localhost:8000/ws/status';
};

export function RealtimeProvider({ children }) {
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const heartbeatRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const [status, setStatus] = useState('connecting');
  const [lastMessage, setLastMessage] = useState(null);

  const connect = useCallback(() => {
    const socket = new WebSocket(getDefaultSocketUrl());
    socketRef.current = socket;
    setStatus('connecting');

    socket.onopen = () => {
      setStatus('connected');
      heartbeatRef.current = window.setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'ping' }));
        }
      }, 25000);
    };

    socket.onmessage = (event) => {
      try {
        setLastMessage(JSON.parse(event.data));
      } catch {
        setLastMessage({ type: 'message', payload: event.data });
      }
    };

    socket.onerror = () => {
      setStatus('error');
    };

    socket.onclose = () => {
      window.clearInterval(heartbeatRef.current);
      setStatus('disconnected');

      if (shouldReconnectRef.current) {
        reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
      }
    };
  }, []);

  useEffect(() => {
    shouldReconnectRef.current = true;
    connect();

    return () => {
      shouldReconnectRef.current = false;
      window.clearTimeout(reconnectTimeoutRef.current);
      window.clearInterval(heartbeatRef.current);
      socketRef.current?.close();
    };
  }, [connect]);

  const sendJson = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      return true;
    }

    return false;
  }, []);

  return (
    <RealtimeContext.Provider value={{ status, lastMessage, sendJson }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);

  if (!context) {
    throw new Error('useRealtime debe usarse dentro de RealtimeProvider');
  }

  return context;
}
