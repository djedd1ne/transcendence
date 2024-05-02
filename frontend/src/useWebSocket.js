import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('WebSocket Connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      console.log('WebSocket Disconnected');
    };
  }, ['http://localhost:3000']);

  return socket;
};

export default useWebSocket;
