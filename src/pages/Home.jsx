import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Book1 from "../assets/Book.jpg";
import BookSections from "../components/BookSections";
import { searchBooks } from "../utils/Api";

const bestSellerBooks = [
    {
        id: "bs1",
        title: "White Nights",
        author: "Fyor Dostoyevsky",
        price: "$19.99",
        discountedPrice: "16.99",
        coverImage: "https://i.pinimg.com/736x/ed/d8/f4/edd8f4a71dcdc14e5ac8639225982fa1.jpg",
    },
    {
        id: "bs2",
        title: "Osamu Dazai",
        author: "No Longer Human",
        price: "$22.99",
        discountedPrice: "19.99",
        coverImage: "https://i.pinimg.com/736x/4e/f6/1c/4ef61c9525ee21c7228f86353a5b7565.jpg",
    },
    {
        id: "bs3",
        title: "Murakami",
        author: "Kafka on the Shore",
        price: "$24.99",
        discountedPrice: "20.99",
        coverImage: "https://i.pinimg.com/736x/9c/e5/8c/9ce58c69df2cbd563404c41e6d3b6052.jpg",
    },
    {
        id: "bs4",
        title: "The Secret History",
        author: "Donna Tartt",
        price: "$23.99",
        discountedPrice: "19.99",
        coverImage: "https://i.pinimg.com/736x/f9/49/68/f949682356327a360b822b5036b7f6dc.jpg",
    },
    {
        id: "bs5",
        title: "1984",
        author: "George Orwell",
        price: "$18.99",
        discountedPrice: "15.99",
        coverImage: "https://i.pinimg.com/736x/47/ec/55/47ec55cb4487080ea75a344228297ad2.jpg",
    },
    {
        id: "bs6",
        title: "The Bell Jar",
        author: "Sylvia Plath",
        price: "$20.99",
        discountedPrice: "17.99",
        coverImage: "https://i.pinimg.com/736x/54/41/46/54414612436d6c7926fea7a00af21bc8.jpg",
    },
    {
        id: "bs7",
        title: "Brave New World",
        author: "Aldous Huxley",
        price: "$19.49",
        discountedPrice: "16.49",
        coverImage: "https://i.pinimg.com/736x/4d/e4/46/4de4461b2faf2356cfc3954c978f9485.jpg",
    },
    {
        id: "bs8",
        title: "Lapvona",
        author: "Otessa Moshfegh",
        price: "$19.49",
        discountedPrice: "16.49",
        coverImage: "https://i.pinimg.com/736x/fc/93/e2/fc93e21de2f6824aed556eb7a335f550.jpg",
    },
    {
        id: "bs9",
        title: "We are the villans",
        author: "M.L.RIO",
        price: "$19.49",
        discountedPrice: "16.49",
        coverImage: "https://i.pinimg.com/736x/94/fe/79/94fe79e66b5731600b9b4b3ef7dd6c6f.jpg",
    },
    {
        id: "bs10",
        title: "A Certain Hunger",
        author: "Chelsea G. Summers",
        price: "$19.49",
        discountedPrice: "16.49",
        coverImage: "https://i.pinimg.com/736x/96/f0/97/96f09761fc319519e0174e2c78827569.jpg",
    },
];

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults(bestSellerBooks);
            return;
        }

        setIsSearching(true);
        setError("");
        try {
            const results = await searchBooks(searchQuery.trim());
            const matchingBestSellers = bestSellerBooks.filter(book => 
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            // Check if results.books exists and is an array
            const searchResults = results.books || [];
            const combinedResults = [...matchingBestSellers, ...searchResults];
            setSearchResults(combinedResults);
        } catch (error) {
            console.error('Search error:', error);
            setError("Failed to fetch books. Please try again.");
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    React.useEffect(() => {
        setSearchResults(bestSellerBooks);
    }, []);

    const handleAddToLibrary = async (book) => {
        const userToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        if (!userToken) {
            navigate('/login');
            return;
        }

        try {
            const libraryBooks = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
            if (libraryBooks.some(b => b.id === book.id)) {
                alert('This book is already in your library!');
                return;
            }
            libraryBooks.push(book);
            localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));
            alert('Book added to your library!');
        } catch (error) {
            console.error('Error adding book to library:', error);
            alert('Failed to add book to library. Please try again.');
        }
    };

    return (
        <MainLayout>
            <section className="py-12">
                <div className="container mx-auto grid md:grid-cols-2 items-center">
                    <div className="space-y-6">
                        <h1 className="font-serif text-5xl px-30 w-200 text-gray-900">Welcome To Your Library</h1>
                        <p className="font-sans text-small text-gray-800 px-30 text-center">
                            From classical literature to educational resources, we have a lot of textbooks to offer you.
                        </p>
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN..."
                                className="w-full p-4 border border-gray-300 rounded-l-lg shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                disabled={isSearching}
                            />
                            <button 
                                type="submit"
                                className="px-6 py-4 bg-slate-700 text-white rounded-r-lg hover:bg-slate-600 disabled:bg-slate-400 transition-colors"
                                disabled={isSearching}
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                    </div>
                    <div className="mt-8 md:mt-0 flex justify-center">
                        <img
                            src={Book1}
                            alt="Book cover"
                            className="w-52 h-auto shadow-2xl transform rotate-[6deg] hover:scale-105 transition duration-500 ease-in-out"
                        />
                    </div>
                </div>
            </section>

            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    {isSearching && (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-rose-500 text-center mb-4">{error}</div>
                    )}

                    {!isSearching && searchResults.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-serif text-center mb-10 text-gray-900">
                                {searchQuery ? 'Search Results' : 'Best Seller Books'}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {searchResults.map(book => (
                                    <div
                                        key={book.id}
                                        className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="relative aspect-[2/3]">
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-serif text-lg text-gray-900 line-clamp-1">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">{book.author}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-green-600 font-medium">
                                                    ${book.discountedPrice}
                                                </span>
                                                <button 
                                                    onClick={() => handleAddToLibrary(book)}
                                                    className="bg-slate-700 text-white px-3 py-1 text-sm rounded hover:bg-slate-600 transition-colors"
                                                >
                                                    Add to Library
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isSearching && searchResults.length === 0 && searchQuery && (
                        <div className="text-center text-gray-500 py-10">
                            <p className="text-xl">No books found</p>
                            <p className="mt-2">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </section>

            <BookSections />
        </MainLayout>
    );
}

export default Home;