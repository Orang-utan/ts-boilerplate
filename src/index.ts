import socket from 'socket.io';
import expressStatusMonitor from 'express-status-monitor';
import createServer from './utils/createServer';
import db from './utils/database';
import './utils/config';

const main = async () => {
  // listen for termination
  process.on('SIGTERM', () => process.exit());
  await db.open();

  const app = createServer();
  const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
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
};

main();
