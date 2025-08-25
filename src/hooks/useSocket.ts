import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface OrderUpdateEvent {
  orderId: string;
  status: string;
  estimatedDate?: string;
  timestamp: string;
  message?: string;
}

export const useSocket = (orderId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [orderUpdate, setOrderUpdate] = useState<OrderUpdateEvent | null>(null);

  useEffect(() => {
    const newSocket = io('https://final-year-project-backend-ubk7.onrender.com');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Connected to Socket.IO server:', newSocket.id);
      
      // Subscribe to order updates
      newSocket.emit('subscribe', { orderId });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('🔌 Disconnected from Socket.IO server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
      setIsConnected(false);
    });

    // Listen for your specific order
    if (orderId) {
      newSocket.on(`${orderId}/update`, (updateEvent: OrderUpdateEvent) => {
        console.log('📦 Real-time order update received:', updateEvent);
        setOrderUpdate(updateEvent);
      });
    }

    return () => {
      console.log('🔌 Closing Socket.IO connection');
      newSocket.close();
    };
  }, [orderId]);

  return { socket, isConnected, orderUpdate };
};
