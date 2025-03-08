const express = require('express');
const multer = require('multer');
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3001;

const upload = multer({ storage: multer.memoryStorage() });
let db, gfs;

const mongoURI = 'mongodb://localhost:27017/3d_models_db';
MongoClient.connect(mongoURI)
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('3d_models_db');
    gfs = new GridFSBucket(db, { bucketName: 'models' });
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Rest of your routes (upload-model, model/:id, models) remain unchanged...

// API to upload a model
app.post('/upload-model', upload.single('model'), async (req, res) => {
  if (!gfs) return res.status(503).send('Database not ready');
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');

    const fileName = `${Date.now()}-${file.originalname}`;
    const uploadStream = gfs.openUploadStream(fileName, {
      contentType: file.mimetype,
      metadata: { originalName: file.originalname, size: file.size },
    });

    uploadStream.end(file.buffer);
    uploadStream.on('finish', () => {
      res.json({ fileId: uploadStream.id, message: 'Model uploaded successfully' });
    });
    uploadStream.on('error', (error) => {
      throw error;
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Upload failed');
  }
});

// API to fetch a model
app.get('/model/:id', async (req, res) => {
  if (!gfs) return res.status(503).send('Database not ready');
  try {
    const fileId = new ObjectId(req.params.id);
    const files = await db.collection('models.files').findOne({ _id: fileId });
    if (!files) return res.status(404).send('Model not found');

    res.set('Content-Type', files.contentType);
    const downloadStream = gfs.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).send('Error streaming model');
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Error fetching model');
  }
});

// Optional: API to list all models (for dynamic selection in React)
app.get('/models', async (req, res) => {
  if (!gfs) return res.status(503).send('Database not ready');
  try {
    const files = await db.collection('models.files').find().toArray();
    res.json(files.map(file => ({
      id: file._id,
      name: file.metadata.originalName,
      size: file.metadata.size,
      uploadDate: file.uploadDate,
    })));
  } catch (error) {
    console.error('List error:', error);
    res.status(500).send('Error listing models');
  }
});