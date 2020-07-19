import mongoose from 'mongoose';

export default function connectToDatabase(
  cb: (err: Error) => void
): (err: Error) => void {
  const uri: string | undefined = process.env.ATLAS_URI;
  mongoose.Promise = global.Promise;
  mongoose.connect(uri!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.on(
    'error',
    console.error.bind(
      console,
      'MongoDB connection error. Please make sure MongoDB is running.'
    )
  );

  mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established succesfully 🤖');
  });
  return cb;
}
