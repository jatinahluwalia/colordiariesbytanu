import { connect } from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    return console.log('=> using existing database connection');
  }
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined');
  try {
    await connect(process.env.MONGODB_URI);
    isConnected = true;
    return console.log('Connection to database successful');
  } catch (error) {
    throw console.log('Connection to database failed', error);
  }
};
