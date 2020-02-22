const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('sample-db', sampleSchema);