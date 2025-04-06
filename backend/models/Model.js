const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Part Schema (nested within Model)
const PartSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uses: {
    type: String,
    default: '',
  },
  model: {
    type: String, // GridFS file ID as string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Model Schema
const ModelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Biology', 'Chemistry', 'Physics', 'Mathematics', ''],
    required: true,
  },
  mainModel: {
    type: String, // GridFS file ID as string
    required: true,
  },
  modelCover: {
    type: String, // GridFS file ID as string (for image)
    default: 'default_cover.jpg',
  },
  keyframes: {
    type: String,
    default: '',
  },
  framesPerSecond: {
    type: String,
    default: '24',
  },
  parts: [PartSchema], // Array of parts
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  instructorId: {
    type: Schema.Types.ObjectId, // Reference to the instructor who created it
    ref: 'Instructor',
    required: true,
  },
});

const Model = mongoose.model('Model', ModelSchema);
module.exports = Model;