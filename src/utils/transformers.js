import { API_CONFIG } from './config';

/**
 * Calculate discounted price based on original price and discount percentage
 */
export const calculateDiscountedPrice = (price, discountPercentage = API_CONFIG.PRICING.DEFAULT_DISCOUNT_PERCENTAGE) => {
    const originalPrice = Number(price) || API_CONFIG.PRICING.DEFAULT_PRICE;
    const discount = (originalPrice * discountPercentage) / 100;
    return Number((originalPrice - discount).toFixed(2));
};

/**
 * Extract ISBN from Google Books industry identifiers
 */
export const extractISBN = (industryIdentifiers) => {
    if (!industryIdentifiers || !Array.isArray(industryIdentifiers)) {
        return null;
    }
    
    // Prefer ISBN_13 over ISBN_10
    const isbn13 = industryIdentifiers.find(id => id.type === 'ISBN_13');
    const isbn10 = industryIdentifiers.find(id => id.type === 'ISBN_10');
    
    return (isbn13 || isbn10)?.identifier || null;
};

/**
 * Transform Google Books volume data to our app's book format
 */
export const transformGoogleBookToAppBook = (item) => {
    if (!item?.volumeInfo) {
        throw new Error('Invalid book data structure');
    }

    const { volumeInfo, saleInfo } = item;
    const originalPrice = saleInfo?.listPrice?.amount || API_CONFIG.PRICING.DEFAULT_PRICE;
    const discountedPrice = calculateDiscountedPrice(originalPrice);

    return {
        id: item.id,
        title: volumeInfo.title,
        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
        isbn: extractISBN(volumeInfo.industryIdentifiers),
        description: volumeInfo.description,
        publishedYear: volumeInfo.publishedDate ? 
            new Date(volumeInfo.publishedDate).getFullYear() : null,
        coverImage: volumeInfo.imageLinks?.thumbnail || 
            'https://via.placeholder.com/128x196?text=No+Cover',
        price: originalPrice,
        discountedPrice: discountedPrice,
        discount: `${API_CONFIG.PRICING.DEFAULT_DISCOUNT_PERCENTAGE}% OFF`
    };
}; 