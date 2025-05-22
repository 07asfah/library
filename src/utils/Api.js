import axios from 'axios';
import { API_CONFIG } from './config';
import { transformGoogleBookToAppBook } from './transformers';
import { handleAPIError, ValidationError } from './errors';

/**
 * Create axios instance with default configuration
 */
const api = axios.create({
    baseURL: API_CONFIG.GOOGLE_BOOKS.BASE_URL,
    timeout: 10000
});

/**
 * Search books using the Google Books API
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of transformed book objects
 */
export const searchBooks = async (query) => {
    try {
        // Use default query if none provided
        const searchQuery = query?.trim() || API_CONFIG.GOOGLE_BOOKS.PARAMS.DEFAULT_QUERY;

        const response = await api.get('', {
            params: {
                q: searchQuery,
                maxResults: API_CONFIG.GOOGLE_BOOKS.PARAMS.DEFAULT_MAX_RESULTS,
                orderBy: API_CONFIG.GOOGLE_BOOKS.PARAMS.DEFAULT_ORDER_BY,
                printType: API_CONFIG.GOOGLE_BOOKS.PARAMS.DEFAULT_PRINT_TYPE
            }
        });

        if (!response.data?.items) {
            return [];
        }

        return response.data.items.map(transformGoogleBookToAppBook);
    } catch (error) {
        handleAPIError(error);
    }
};

/**
 * Search for a book by ISBN
 * @param {string} isbn - ISBN number to search for
 * @returns {Promise<Object>} Transformed book object
 */
export const searchByISBN = async (isbn) => {
    try {
        if (!isbn?.trim()) {
            throw new ValidationError('ISBN is required');
        }

        const response = await api.get('', {
            params: {
                q: `isbn:${isbn.trim()}`
            }
        });

        if (!response.data?.items?.[0]) {
            throw new ValidationError('Book not found');
        }

        return transformGoogleBookToAppBook(response.data.items[0]);
    } catch (error) {
        handleAPIError(error);
    }
};

