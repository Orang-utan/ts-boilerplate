import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import socket from 'socket.io';
import expressStatusMonitor from 'express-status-monitor';
import connectToDatabase from './utils/mongo';
import './utils/config';

import userRouter from './routes/user.api';

const app = express();

connectToDatabase((err) => {
  if (err) console.log(err);
});

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api/users', userRouter);

// Serving static files
if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, 'client', 'build');

  app.use(express.static(root));
  app.get('*', (_, res) => {
    res.sendFile('index.html', { root });
  });
}

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')} 🚀`);
  console.log('  Press Command C to stop\n');
});

const io = socket(server);
io.on('connection', (soc) => {
  console.log('Connected...');
  soc.on('disconnect', () => {
    console.log('Disconnected');
  });
});

app.set('socketio', io);

app.use(expressStatusMonitor({ websocket: io }));
