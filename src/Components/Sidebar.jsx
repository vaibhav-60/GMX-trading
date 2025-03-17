import React from "react";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  if (!sidebarOpen) return null;

  return (
    <div className="w-52 bg-gray-800 p-5 h-screen fixed left-0 top-0 z-50">
      <button 
        onClick={toggleSidebar}
        className="mb-5 w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Close
      </button>
      <button className="w-full mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Start Trading
      </button>
      <button className="w-full mb-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        Staking
      </button>
      <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
        Learn About GMX
      </button>
    </div>
  );
};

export default Sidebar;

