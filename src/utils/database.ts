import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ATLAS_URI, NODE_ENV } from './config';

mongoose.Promise = global.Promise;

/* uncomment for database logger */
// mongoose.set('debug', process.env.DEBUG !== 'production');

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

class MongoConnection {
  private static _instance: MongoConnection;

  private _mongoServer?: MongoMemoryServer;

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  }

  public async open(): Promise<void> {
    try {
      if (NODE_ENV === 'test') {
        console.log('Connecting to In-Memory MongoDB');
        this._mongoServer = new MongoMemoryServer();
        const mongoUrl = await this._mongoServer.getUri();
        await mongoose.connect(mongoUrl, opts);
      } else {
        console.log('Connecting to MongoDB...');
        mongoose.connect(ATLAS_URI, opts);
      }

      mongoose.connection.on('connected', () => {
        console.log('MongoDB: Connected ✅');
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB: Disconnected 🛑');
      });

      mongoose.connection.on('error', (err) => {
        console.log(`MongoDB:  ${String(err)}`);
        if (err.name === 'MongoNetworkError') {
          setTimeout(() => mongoose.connect(ATLAS_URI, opts), 5000);
        }
      });
    } catch (err) {
      console.log(`db.open: ${err}`);
      throw err;
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      if (NODE_ENV === 'test') {
        await this._mongoServer!.stop();
      }
    } catch (err) {
      console.log(`db.open: ${err}`);
      throw err;
    }
  }
}

export default MongoConnection.getInstance();
