const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  tags: [String],
  status: String
});

module.exports = mongoose.model('Problem', problemSchema);

