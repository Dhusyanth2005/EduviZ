const { MongoClient, GridFSBucket } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017/3d_models_db';
let db, gfs;

MongoClient.connect(mongoURI)
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('3d_models_db');
    gfs = new GridFSBucket(db, { bucketName: 'models' });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

module.exports = { db: () => db, gfs: () => gfs };