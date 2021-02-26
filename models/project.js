const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: String,
    description: String,
    category: String,
    languages: [String],
    created_at: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);