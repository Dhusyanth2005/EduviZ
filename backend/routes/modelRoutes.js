const express = require('express');
const { uploadModel, fetchModel, listModels, createModel } = require('../controllers/modelController');
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.post('/upload-model', upload.single('model'), uploadModel);
router.get('/model/:id', fetchModel);
router.get('/models', listModels);
router.post(
  '/create-model',
  upload.fields([
    { name: 'mainModel', maxCount: 1 },
    { name: 'modelCover', maxCount: 1 }, // Added modelCover field
    { name: 'parts', maxCount: 10 }, // Adjust maxCount as needed
  ]),
  createModel
);

module.exports = router;