import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0
};

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
     'LOCAL_DB_URL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
     'REMOTE_DB_URL': process.env.MONGODB_URI
};

mongoose.connect(dbConnectionURL.LOCAL_DB_URL, options);

const db = mongoose.connection;
let bucket;

db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
db.on('connected', () => {
     var db = mongoose.connections[0].db;
     bucket = new mongoose.mongo.GridFSBucket(db, {
       bucketName: "newBucket"
     });
     console.log(bucket);
});

db.once('open', async() => {
     console.log('Mongodb Connection Successful');

});


export { db, dbConnectionURL, bucket };
