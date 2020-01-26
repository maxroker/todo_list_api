const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null},
  completed: { type: Boolean, default: false },
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);