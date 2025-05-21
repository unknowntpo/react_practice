import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

// In-memory message storage
const messages: Array<{
	user_id: string;
	content: string;
}> = [];

// HTTP endpoints
app.get('/v1/chat/messages', (req, res) => {
	res.json({
		type: 'messages',
		data: messages
	});
});

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	console.log('Client connected');

	// Send initial messages to the client
	ws.send(JSON.stringify({
		type: 'messages',
		data: messages
	}));

	ws.on('message', (data: string) => {
		try {
			const message = JSON.parse(data.toString());
			if (message.type === 'messages' && message.data) {
				// Store new messages
				messages.push(...message.data);

				// Broadcast to all connected clients
				wss.clients.forEach((client) => {
					if (client.readyState === ws.OPEN) {
						client.send(JSON.stringify({
							type: 'messages',
							data: message.data
						}));
					}
				});
			}
		} catch (error) {
			console.error('Error processing message:', error);
		}
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	console.log(`WebSocket server running at ws://localhost:${port}`);
}); 