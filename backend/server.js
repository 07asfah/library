require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Book = require('./models/Book');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book-library')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Get all books with pagination
app.get('/api/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const books = await Book.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Book.countDocuments();

        res.json({
            books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Search books by query
app.get('/api/books/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const books = await Book.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { author: { $regex: q, $options: 'i' } }
            ]
        }).limit(20);

        res.json(books);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
});

// Search book by ISBN
app.get('/api/books/isbn/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('ISBN search error:', error);
        res.status(500).json({ message: 'Error searching book by ISBN' });
    }
});

// Add a new book
app.post('/api/books', upload.single('coverImage'), async (req, res) => {
    try {
        const bookData = req.body;
        if (req.file) {
            bookData.coverImage = `/uploads/${req.file.filename}`;
        }

        const book = new Book(bookData);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book' });
    }
});

// Update a book
app.put('/api/books/:id', upload.single('coverImage'), async (req, res) => {
    try {
        const bookData = req.body;
        if (req.file) {
            bookData.coverImage = `/uploads/${req.file.filename}`;
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            bookData,
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book' });
    }
});

// Add some sample books (for testing)
app.post('/api/books/seed', async (req, res) => {
    try {
        const sampleBooks = [
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                isbn: "9780743273565",
                price: 14.99,
                discountedPrice: 12.99,
                discount: "13% OFF",
                coverImage: "https://example.com/gatsby.jpg"
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                isbn: "9780446310789",
                price: 12.99,
                discountedPrice: 10.99,
                discount: "15% OFF",
                coverImage: "https://example.com/mockingbird.jpg"
            }
        ];

        await Book.insertMany(sampleBooks);
        res.json({ message: 'Sample books added successfully' });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ message: 'Error seeding books' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 