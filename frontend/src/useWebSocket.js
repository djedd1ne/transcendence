// useWebSocket.js

import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      // Optionally try to reconnect here
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
};

export default useWebSocket;
