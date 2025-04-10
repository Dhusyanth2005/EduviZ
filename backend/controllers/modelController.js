const { ObjectId } = require('mongodb');
const { getGfs, getDb } = require('../config/db');
const Model = require('../models/Model');

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

const fetchModelsByInstructor = async (req, res) => {
  const { instructorId } = req.params;
  const gfs = getGfs();
  if (!gfs) return res.status(503).send('Database not ready');

  try {
    const models = await Model.find({ instructorId }).lean();
    if (!models.length) {
      return res.json([]); // Return empty array if no models found
    }

    // Enrich with GridFS file data using IDs only
    const enrichedModels = await Promise.all(
      models.map(async (model) => {
        return {
          id: model._id,
          title: model.title,
          description: model.description,
          category: model.category,
          mainModel: model.mainModel, // Use ID instead of originalName
          modelCover: model.modelCover, // Use ID instead of originalName
          keyframes: model.keyframes,
          framesPerSecond: model.framesPerSecond,
          parts: model.parts.map(part => ({
            title: part.title,
            description: part.description,
            uses: part.uses,
            model: part.model // Keep as ID
          })),
          createdAt: model.createdAt,
          instructorId: model.instructorId,
          views: model.views || 0, // Add logic if you track views
          isPublished: model.isPublished || false // Add logic if you implement publishing
        };
      })
    );

    res.json(enrichedModels);
  } catch (error) {
    console.error('Error fetching models by instructor:', error);
    res.status(500).send('Error fetching models');
  }
};
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find().lean(); // Fetch all models from the Model collection
    if (!models.length) {
      return res.status(404).json({ message: 'No models found' });
    }
    res.json(models);
  } catch (error) {
    console.error('Error fetching all models:', error);
    res.status(500).send('Error fetching models');
  }
};
const createModel = async (req, res) => {
  const gfs = getGfs();
  if (!gfs) return res.status(503).send('Database not ready');

  try {
    const {
      title,
      description,
      category,
      keyframes,
      framesPerSecond,
      instructorId,
      partsData
    } = req.body;

    const mainModelFile = req.files['mainModel'] ? req.files['mainModel'][0] : null;
    const modelCoverFile = req.files['modelCover'] ? req.files['modelCover'][0] : null;
    const partFiles = req.files['parts'] || [];

    if (!mainModelFile) return res.status(400).send('Main model file is required');

    // Upload main model to GridFS
    const mainModelFileName = `${Date.now()}-${mainModelFile.originalname}`;
    const mainUploadStream = gfs.openUploadStream(mainModelFileName, {
      contentType: mainModelFile.mimetype,
      metadata: { originalName: mainModelFile.originalname, size: mainModelFile.size },
    });
    mainUploadStream.end(mainModelFile.buffer);
    const mainModelId = await new Promise((resolve, reject) => {
      mainUploadStream.on('finish', () => resolve(mainUploadStream.id.toString()));
      mainUploadStream.on('error', reject);
    });

    // Upload model cover to GridFS (optional)
    let modelCoverId = null;
    if (modelCoverFile) {
      const modelCoverFileName = `${Date.now()}-${modelCoverFile.originalname}`;
      const coverUploadStream = gfs.openUploadStream(modelCoverFileName, {
        contentType: modelCoverFile.mimetype,
        metadata: { originalName: modelCoverFile.originalname, size: modelCoverFile.size },
      });
      coverUploadStream.end(modelCoverFile.buffer);
      modelCoverId = await new Promise((resolve, reject) => {
        coverUploadStream.on('finish', () => resolve(coverUploadStream.id.toString()));
        coverUploadStream.on('error', reject);
      });
    }

    // Upload part models to GridFS
    const partsDataParsed = JSON.parse(partsData || '[]');
    const uploadedParts = await Promise.all(
      partsDataParsed.map(async (part, index) => {
        const partFile = partFiles[index];
        if (!partFile) throw new Error(`Missing file for part: ${part.title}`);

        const partFileName = `${Date.now()}-${partFile.originalname}`;
        const partUploadStream = gfs.openUploadStream(partFileName, {
          contentType: partFile.mimetype,
          metadata: { originalName: partFile.originalname, size: partFile.size },
        });
        partUploadStream.end(partFile.buffer);
        const partModelId = await new Promise((resolve, reject) => {
          partUploadStream.on('finish', () => resolve(partUploadStream.id.toString()));
          partUploadStream.on('error', reject);
        });

        return {
          title: part.title,
          description: part.description,
          uses: part.uses || '',
          model: partModelId,
        };
      })
    );

    // Save to MongoDB using Mongoose
    const newModel = new Model({
      title,
      description,
      category,
      mainModel: mainModelId,
      modelCover: modelCoverId || 'default_cover.jpg', // Use ID or default
      keyframes,
      framesPerSecond,
      parts: uploadedParts,
      instructorId,
      createdAt: new Date(),
      views: 0,
      isPublished: false,
    });

    await newModel.save();

    // Update user's createdCourses
    await Model.updateOne(
      { _id: newModel._id },
      { $push: { createdCourses: newModel._id } },
      { upsert: true }
    );

    res.status(201).json({
      message: 'Model created successfully',
      modelId: newModel._id,
      modelCover: modelCoverId || 'default_cover.jpg', // Return ID for frontend
    });
  } catch (error) {
    console.error('Create model error:', error);
    res.status(500).send('Error creating model');
  }
};

module.exports = { uploadModel, fetchModel, listModels, createModel, fetchModelsByInstructor, getAllModels };