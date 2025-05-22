import axios from 'axios';
import { API_CONFIG } from './config';

const { GOOGLE_BOOKS } = API_CONFIG;

export const searchBooks = async (query) => {
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
        console.error('Error searching books:', error);
        throw error;
    }
};

export const getBookById = async (bookId) => {
    try {
        const response = await axios.get(`${GOOGLE_BOOKS.BASE_URL}/${bookId}`);
        const item = response.data;

        return {
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
        };
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
}; 