import React from 'react';
import MainLayout from '../layouts/MainLayout';

const BookDetail = () => {
    return (
        <MainLayout>
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold mb-4">Book Details Page</h1>
                <p>informations about the book will appear here.</p>
            </div>
        </MainLayout>
    );
};

export default BookDetail;