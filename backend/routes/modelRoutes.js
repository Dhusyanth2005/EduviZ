const express = require('express');
const { uploadModel, fetchModel, listModels } = require('../controllers/modelController');
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.post('/upload-model', upload.single('model'), uploadModel);
router.get('/model/:id', fetchModel);
router.get('/models', listModels);

module.exports = router;