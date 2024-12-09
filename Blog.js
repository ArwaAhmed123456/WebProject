const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, // URL of the blog image
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    isPublished: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Blog', blogSchema);