import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Library = () => {
    return (
        <MainLayout>
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold mb-4">Library Page</h1>
                <p>Your book collection will appear here.</p>
            </div>
        </MainLayout>
    );
};

export default Library;