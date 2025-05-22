import axios from 'axios';
import { API_CONFIG } from './config';

const { GOOGLE_BOOKS } = API_CONFIG;
const API_BASE_URL = '/api';


export const searchGoogleBooks = async (query) => {
    try {
        const response = await axios.get(GOOGLE_BOOKS.BASE_URL, {
            params: {
                q: query,
                maxResults: GOOGLE_BOOKS.PARAMS.DEFAULT_MAX_RESULTS,
                orderBy: GOOGLE_BOOKS.PARAMS.DEFAULT_ORDER_BY,
                printType: GOOGLE_BOOKS.PARAMS.DEFAULT_PRINT_TYPE
            }
        });

        return response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: item.volumeInfo.description || '',
            publishedYear: item.volumeInfo.publishedDate ? new Date(item.volumeInfo.publishedDate).getFullYear() : null,
            coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
            price: API_CONFIG.PRICING.DEFAULT_PRICE,
            discountedPrice: (API_CONFIG.PRICING.DEFAULT_PRICE * (100 - API_CONFIG.PRICING.DEFAULT_DISCOUNT_PERCENTAGE) / 100).toFixed(2),
            discount: `${API_CONFIG.PRICING.DEFAULT_DISCOUNT_PERCENTAGE}% OFF`,
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || ''
        }));
    } catch (error) {
        console.error('Error searching Google Books:', error);
        throw error;
    }
};


export const searchLocalBooks = async (query, page = 1, limit = 20) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/search`, {
            params: { q: query, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching local books:', error);
        throw error;
    }
};

export const getBookByIsbn = async (isbn) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book by ISBN:', error);
        throw error;
    }
};

export const addBook = async (bookData, coverImage) => {
    try {
        const formData = new FormData();
        Object.keys(bookData).forEach(key => {
            formData.append(key, bookData[key]);
        });
        
        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        const response = await axios.post(`${API_BASE_URL}/books`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookId, bookData, coverImage) => {
    try {
        const formData = new FormData();
        Object.keys(bookData).forEach(key => {
            formData.append(key, bookData[key]);
        });
        
        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        const response = await axios.put(`${API_BASE_URL}/books/${bookId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export const getAllBooks = async (page = 1, limit = 20) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all books:', error);
        throw error;
    }
};

export const searchBooks = async (query, page = 1, limit = 20) => {
    try {
        const [googleResults, localResults] = await Promise.all([
            searchGoogleBooks(query),
            searchLocalBooks(query, page, limit)
        ]);

        const seenIsbns = new Set();
        const combinedResults = [];

        localResults.books.forEach(book => {
            if (book.isbn) {
                seenIsbns.add(book.isbn);
            }
            combinedResults.push(book);
        });

        googleResults.forEach(book => {
            if (!book.isbn || !seenIsbns.has(book.isbn)) {
                combinedResults.push(book);
            }
        });

        return {
            books: combinedResults,
            currentPage: page,
            totalPages: Math.ceil(combinedResults.length / limit),
            totalBooks: combinedResults.length
        };
    } catch (error) {
        console.error('Error in combined search:', error);
        throw error;
    }
}; 