import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { searchBooks } from '../utils/Api';

const Library = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
        
        fetchBooks();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBooks();
        }, 500);

        return () => clearTimeout(delayDebounce); 
    }, [search]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await searchBooks(search);
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBook = (bookId) => {
        try {
            const updatedBooks = books.filter(book => book.id !== bookId);
            localStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
            setBooks(updatedBooks);
            alert('Book removed from your library');
        } catch (error) {
            console.error('Error removing book:', error);
            alert('Failed to remove book. Please try again.');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your library</h2>
                        <p className="text-gray-600 mb-6">Create an account or sign in to start collecting your favorite books.</p>
                        <div className="space-x-4">
                            <Link 
                                to="/login" 
                                className="inline-block bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition"
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/signup" 
                                className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                    <p>Loading...</p>
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map(book => (
                            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-w-2 aspect-h-3">
                                    <img
                                        src={book.coverImage}
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
                                            {book.price !== book.discountedPrice && (
                                                <span className="text-gray-400 text-sm line-through">${book.price}</span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveBook(book._id)}
                                            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No books found.</p>
                )}
            </div>
        </MainLayout>
    );
};

export default Library;

