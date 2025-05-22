    import React, { useRef } from "react";
    import { ChevronLeft, ChevronRight } from "lucide-react";

    const bestSellerBooks = [
    {
        id: 1,
        title: "White Nights",
        author: "Fyor Dostoyevsky",
        price: "$19.99",
        discountedPrice: "$16.99",
        discount: "15% OFF",
        coverImage:
        "https://i.pinimg.com/736x/ed/d8/f4/edd8f4a71dcdc14e5ac8639225982fa1.jpg",
    },
    {
        id: 2,
        title: "Osamu Dazai",
        author: "No Longer Human",
        price: "$22.99",
        discountedPrice: "$19.99",
        discount: "15% OFF",
        coverImage:
        "https://i.pinimg.com/736x/4e/f6/1c/4ef61c9525ee21c7228f86353a5b7565.jpg",
    },
    {
        id: 3,
        title: "Murakami",
        author: "Kafka on the Shore",
        price: "$24.99",
        discountedPrice: "$20.99",
        discount: "15% OFF",
        coverImage:
        "https://i.pinimg.com/736x/9c/e5/8c/9ce58c69df2cbd563404c41e6d3b6052.jpg",
    },
    {
        id: 4,
        title: "The Secret History",
        author: "Donna Tartt",
        price: "$23.99",
        discountedPrice: "$19.99",
        discount: "15% OFF",
        coverImage:
        "https://i.pinimg.com/736x/f9/49/68/f949682356327a360b822b5036b7f6dc.jpg",
    },
    {
        id: 5,
        title: "1984",
        author: "George Orwell",
        price: "$18.99",
        discountedPrice: "$15.99",
        discount: "15% OFF",
        coverImage: "https://i.pinimg.com/736x/47/ec/55/47ec55cb4487080ea75a344228297ad2.jpg",
    },
    {
        id: 6,
        title: "The Bell Jar",
        author: "Sylvia Plath",
        price: "$20.99",
        discountedPrice: "$17.99",
        discount: "15% OFF",
        coverImage:"https://i.pinimg.com/736x/54/41/46/54414612436d6c7926fea7a00af21bc8.jpg",
    },
    {
        id: 7,
        title: "Brave New World",
        author: "Aldous Huxley",
        price: "$19.49",
        discountedPrice: "$16.49",
        discount: "15% OFF",
        coverImage:"https://i.pinimg.com/736x/4d/e4/46/4de4461b2faf2356cfc3954c978f9485.jpg",
    },
    {
        id: 8,
        title: "Lapvona",
        author: "Otessa Moshfegh",
        price: "$19.49",
        discountedPrice: "$16.49",
        discount: "15% OFF",
        coverImage:"https://i.pinimg.com/736x/fc/93/e2/fc93e21de2f6824aed556eb7a335f550.jpg",
    },
    {
        id: 9,
        title: "We are the villans",
        author: "M.L.RIO",
        price: "$19.49",
        discountedPrice: "$16.49",
        discount: "15% OFF",
        coverImage:"https://i.pinimg.com/736x/94/fe/79/94fe79e66b5731600b9b4b3ef7dd6c6f.jpg",
    },
    {
        id: 10,
        title: "A Certain Hunger",
        author: "Chelsea G. Summers",
        price: "$19.49",
        discountedPrice: "$16.49",
        discount: "15% OFF",
        coverImage:"https://i.pinimg.com/736x/96/f0/97/96f09761fc319519e0174e2c78827569.jpg",
    },
    ];

    const featureBooks = [
    {
        id: 1,
        title: "These Truths",
        author: "Jill Lepore",
        coverImage:
        "https://i.pinimg.com/736x/25/26/20/25262079bc34784228d0960e378145aa.jpg",
    },
    {
        id: 2,
        title: "New Dimension",
        author: "Robert Silverberg",
        coverImage:
        "https://i.pinimg.com/736x/2c/45/74/2c45748083cfb8967ddb29a72c4df9c3.jpg",
    },
    {
        id: 3,
        title: "Euripides V",
        author: "The Bacchae",
        coverImage:
        "https://i.pinimg.com/736x/c0/07/c7/c007c7d56720f1877721c0d60e312b70.jpg",
    },
    {
        id: 4,
        title: "SETE",
        author: "Alberto Riva",
        coverImage:
        "https://i.pinimg.com/736x/68/57/0e/68570ebf90a6aff78c55d997a858adbd.jpg",
    },
    ];

    const BookSections = () => {
    const scrollRef = useRef();

    const scroll = (direction) => {
        if (scrollRef.current) {
        scrollRef.current.scrollBy({
            left: direction === "right" ? 300 : -300,
            behavior: "smooth",
        });
        }
    };

    return (
        <>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-10 text-gray-900">
                Best Seller Books
            </h2>
            <div className="relative">
                <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hidden"
                >
                {bestSellerBooks.map((book) => (
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
                        <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 text-xs font-medium text-gray-800 rounded">
                        {book.discount}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-serif text-lg text-gray-900">
                        {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="mt-2 flex items-center space-x-2">
                        <span className="text-green-600 font-medium">
                            {book.discountedPrice}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                            {book.price}
                        </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                <button
                    onClick={() => scroll("left")}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                >
                    <ChevronRight size={20} />
                </button>
                </div>
            </div>
            </div>
        </section>
        <section className="py-12">
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="grid grid-cols-2 gap-4">
                {featureBooks.map((book) => (
                    <div
                    key={book.id}
                    className="aspect-[2/3] hover:scale-105 transition-transform duration-300 shadow-lg rounded overflow-hidden"
                    >
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                    </div>
                ))}
                </div>
                <div className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-4xl font-serif font-semibold text-gray-900 leading-snug">
                    Find Your Favorite Books Here
                </h2>
                <p className="text-gray-600 text-lg max-w-xl">
                    Discover engaging collections from top authors across various
                    genres. Whether you're into fiction, history, or philosophy —
                    our catalog has something for every reader.
                </p>
                <div className="flex flex-col sm:flex-row justify-between gap-6 text-center">
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-4xl font-bold text-green-600">80+</p>
                    <p className="text-sm text-gray-700 mt-1">Best Seller Books</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-4xl font-bold text-green-600">60</p>
                    <p className="text-sm text-gray-700 mt-1">New Arrivals</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-4xl font-bold text-green-600">150+</p>
                    <p className="text-sm text-gray-700 mt-1">Happy Readers</p>
                    </div>
                </div>
                <div>
                    <button className="px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
                    Learn More
                    </button>
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
    );
    };

    export default BookSections;
