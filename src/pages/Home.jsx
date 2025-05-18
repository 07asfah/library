import React from "react";
import MainLayout from "../layouts/MainLayout";
import Book1 from "../assets/Book.jpg";
import Book2 from "../assets/1984.jpg";





function Home() {
    return (
        <MainLayout>
        <section className=" py-12">
    <div className="container mx-auto grid md:grid-cols-2 items-center">
        <div className="space-y-6">
        <h1 className="font-serif text-5xl px-30 w-200  text-gray-900">Welcome To Your Library </h1>
        <p className="font-sans text-small text-gray-800 px-30 text-center">
            From classical literature to educational resources, we have a lot of textbooks to offer you.
        </p>
        <div className="flex">
            <input type="text" placeholder="Search by ISBN or author" className="border px-4 py-2 rounded-l-md w-full"/>
            <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
            Search
            </button>
        </div>
        </div>
        <div className="mt-8 md:mt-0 flex justify-center">
        <img src={Book1} alt="Book cover" className=" w-52 h-auto shadow-2xl transform rotate-[6deg] hover:scale-105 transition duration-500 ease-in-out"/>
        </div>
    </div>
    </section>
        </MainLayout>
    );
}

export default Home; 