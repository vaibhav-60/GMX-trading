import React from "react";

const Navbar = ({ toggleSidebar, searchQuery, setSearchQuery, handleCryptoSearch }) => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button 
          onClick={toggleSidebar}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Menu
        </button>
        
        <form onSubmit={handleCryptoSearch} className="flex-1 max-w-xl mx-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crypto (e.g., bitcoin, ethereum)"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
