export const API_CONFIG = {
    GOOGLE_BOOKS: {
        BASE_URL: 'https://www.googleapis.com/books/v1/volumes',
        API_KEY: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '',
        PARAMS: {
            DEFAULT_MAX_RESULTS: 20,
            DEFAULT_ORDER_BY: 'relevance',
            DEFAULT_PRINT_TYPE: 'books',
            DEFAULT_QUERY: 'subject:fiction'
        }
    },
    PRICING: {
        DEFAULT_PRICE: 19.99,
        DEFAULT_DISCOUNT_PERCENTAGE: 10,
        CURRENCY: 'USD'
    }
}; 