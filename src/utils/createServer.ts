import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from '../routes/user.api';

const createServer = (): express.Express => {
  const app = express();
  app.set('port', process.env.PORT || 5000);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // API Routes
  app.use('/api/users', userRouter);

  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '..', 'client', 'build');

    app.use(express.static(root));
    app.get('*', (_, res) => {
      res.sendFile('index.html', { root });
    });
  }

  return app;
};

export default createServer;
