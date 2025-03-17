import React from "react";

const Navbar = ({ toggleSidebar, searchQuery, setSearchQuery, handleSearch, searchResult }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 w-full">
      <button 
        onClick={toggleSidebar}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Menu
      </button>
      <div>
        <input
          type="text"
          placeholder="Search crypto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 rounded mr-2 bg-gray-700 text-white"
        />
        <button 
          onClick={handleSearch}
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Search
        </button>
      </div>
      {searchResult && <p className="text-white">Price: ${searchResult}</p>}
    </div>
  );
};

export default Navbar;
