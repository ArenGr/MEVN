const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  files: {
    type: Array
  },
}, {
  collection: 'files'
})

module.exports = mongoose.model('File', fileSchema)
