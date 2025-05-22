    import React, { useState } from 'react';
    import MainLayout from '../layouts/MainLayout';

    const mockBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 3, title: "Deep Work", author: "Cal Newport" },
    { id: 4, title: "Clean Code", author: "Robert C. Martin" },
    ];

    const Library = () => {
    const [search, setSearch] = useState('');

    const filteredBooks = mockBooks.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

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
            {filteredBooks.length > 0 ? (
            <ul className="space-y-3">
                {filteredBooks.map(book => (
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

