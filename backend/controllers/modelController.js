const { ObjectId } = require('mongodb');
const { getGfs ,getDb} = require('../config/db');

const uploadModel = async (req, res) => {
  const gfs = getGfs();
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
};

const fetchModel = async (req, res) => {
    const gfs = getGfs();
    console.log('Fetching model ID:', req.params.id); // Debug log
    if (!gfs) {
      console.log('Database not ready');
      return res.status(503).send('Database not ready');
    }
    try {
      const fileId = new ObjectId(req.params.id);
      const files = await (await getDb()).collection('models.files').findOne({ _id: fileId });
      if (!files) {
        console.log('Model not found:', fileId);
        return res.status(404).send('Model not found');
      }
  
      console.log('Serving model:', files.filename);
      res.set('Content-Type', files.contentType || 'model/gltf-binary');
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
};

const listModels = async (req, res) => {
  const gfs = getGfs();
  if (!gfs) return res.status(503).send('Database not ready');
  try {
    const files = await (await getDb()).collection('models.files').find().toArray();
    res.json(
      files.map((file) => ({
        id: file._id,
        name: file.metadata.originalName,
        size: file.metadata.size,
        uploadDate: file.uploadDate,
      }))
    );
  } catch (error) {
    console.error('List error:', error);
    res.status(500).send('Error listing models');
  }
};

module.exports = { uploadModel, fetchModel, listModels };