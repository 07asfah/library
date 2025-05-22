const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    publishedYear: Number,
    coverImage: String,
    price: {
        type: Number,
        required: true
    },
    discountedPrice: Number,
    discount: String
}, {
    timestamps: true
});


bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema); 