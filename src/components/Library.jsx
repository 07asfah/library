import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { searchBooks, addBook } from '../utils/api';

const Library = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const results = await searchBooks(search, page);
                setBooks(results.books);
                setTotalPages(results.totalPages);
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            if (search) {
                fetchBooks();
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

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

                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
                />

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
                    </div>
                ) : books.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map(book => (
                                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-w-2 aspect-h-3">
                                        <img
                                            src={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'}
                                            alt={book.title}
                                            className="w-full h-[300px] object-cover"
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
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-slate-700 text-white rounded disabled:bg-slate-400"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-slate-700 text-white rounded disabled:bg-slate-400"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500 text-center">
                        {search ? 'No books found.' : 'Start typing to search for books...'}
                    </p>
                )}
            </div>
        </MainLayout>
    );
};

export default Library; 