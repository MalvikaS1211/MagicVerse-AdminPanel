import { io } from 'socket.io-client';

// const SOCKET_URL = 'http://192.168.1.80:2222';
const SOCKET_URL = 'wss://backoffice.inrx.io/';

const socket = io(SOCKET_URL, {
    transports: ['websocket'], // Ensure WebSocket transport is used
    upgrade: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

export default socket;