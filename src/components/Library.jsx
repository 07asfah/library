import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { searchBooks, addBook } from '../utils/Api';

const Library = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBooks = async () => {
        setLoading(true);
        setError('');
        try {
            const results = await searchBooks(search, page);
            console.log('Search results:', results);
            setBooks(results.books);
            setTotalPages(results.totalPages);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books. Please try again.');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search) {
                fetchBooks();
            } else {
                setBooks([]);
                setError('');
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setPage(1); 
    };

    const handleAddToLibrary = async (book) => {
        try {
            await addBook({
                title: book.title,
                author: book.author,
                description: book.description,
                publishedYear: book.publishedYear,
                price: book.price,
                discountedPrice: book.discountedPrice,
                discount: book.discount,
                isbn: book.isbn
            });
            alert('Book added to library successfully!');
        } catch (error) {
            console.error('Error adding book to library:', error);
            alert('Failed to add book to library. Please try again.');
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold mb-4">Library</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                </div>

                {loading && (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && books.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map(book => (
                                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-w-2 aspect-h-3">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-full h-[300px] object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/128x192?text=No+Cover';
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-2">{book.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                                        {book.isbn && (
                                            <p className="text-xs text-gray-500 mb-2">ISBN: {book.isbn}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-700 font-medium">${book.discountedPrice}</span>
                                                <span className="text-gray-400 text-sm line-through">${book.price}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleAddToLibrary(book)}
                                                className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition-colors text-sm"
                                            >
                                                Add to Library
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || loading}
                                    className="px-4 py-2 bg-slate-700 text-white rounded disabled:bg-slate-400"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || loading}
                                    className="px-4 py-2 bg-slate-700 text-white rounded disabled:bg-slate-400"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!loading && !error && books.length === 0 && search && (
                    <div className="text-center text-gray-500 py-10">
                        <p className="text-xl">No books found</p>
                        <p className="mt-2">Try adjusting your search terms</p>
                    </div>
                )}

                {!loading && !error && !search && (
                    <div className="text-center text-gray-500 py-10">
                        <p className="text-xl">Start typing to search for books</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Library; 