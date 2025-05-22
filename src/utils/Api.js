    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';

    const Library = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/books?search=${encodeURIComponent(search)}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
        };

        const delayDebounce = setTimeout(() => {
        fetchBooks();
        }, 500);

        return () => clearTimeout(delayDebounce); 
    }, [search]);

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
            <ul className="space-y-3">
                {books.map(book => (
                <li key={book.id} className="p-4 bg-white shadow rounded">
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500">No books found.</p>
            )}
        </div>
        </MainLayout>
    );
    };

    export default Library;

