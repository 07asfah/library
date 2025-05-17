import React from "react";
import Navbar from "../components/Navbar"; // <- Import Navbar

function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mt-4 text-center">Welcome to the Book Library</h1>
    </div>
  );
}

export default Home;