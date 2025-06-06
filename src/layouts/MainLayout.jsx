import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className=" bg-[#f4f3ef] flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </div>
    );
}
