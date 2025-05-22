import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function BookDetail() {
    const { isAdmin } = useAdmin();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        publishDate: '',
        coverImage: null
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });

    // Redirect if not admin
    if (!isAdmin) {
        navigate('/admin/login');
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBookData(prev => ({
                ...prev,
                coverImage: file
            }));
            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: 'info', content: 'Adding book...' });
        
        try {
            // Here you would typically send this to your backend
            console.log('Book Data:', bookData);
            setMessage({ type: 'success', content: 'Book added successfully!' });
            
            // Clear form after success
            setBookData({
                title: '',
                author: '',
                description: '',
                price: '',
                publishDate: '',
                coverImage: null
            });
            setPreviewUrl('');
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to add book. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Add New Book</h1>
                
                {message.content && (
                    <div className={`mb-4 p-4 rounded ${
                        message.type === 'error' ? 'bg-rose-100 text-rose-700' :
                        message.type === 'success' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                        {message.content}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={bookData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={bookData.author}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={bookData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                                <input
                                    type="date"
                                    name="publishDate"
                                    value={bookData.publishDate}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-slate-50 file:text-slate-700
                                        hover:file:bg-slate-100"
                                />
                                {previewUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={previewUrl}
                                            alt="Cover preview"
                                            className="h-40 w-32 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={bookData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}