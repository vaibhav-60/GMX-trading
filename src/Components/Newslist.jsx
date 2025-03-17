import React from "react";

const NewsList = ({ news, newsFilter, setNewsFilter }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Latest Crypto News</h2>
        <div className="flex flex-wrap gap-2">
          {["all", "btc", "eth", "gmx"].map((filter) => (
            <button
              key={filter}
              onClick={() => setNewsFilter(filter)}
              className={`px-4 py-2 rounded transition-all duration-200 ${
                newsFilter === filter
                  ? 'bg-blue-500 text-white scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {!news || news.length === 0 ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading latest crypto news...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold text-blue-400 hover:text-blue-300 block mb-3"
                >
                  {article.title}
                </a>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    {article.source?.title || 'Unknown Source'}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    {new Date(article.published_at).toLocaleDateString()}
                  </span>
                </div>
                {article.currencies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.currencies.map((currency, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {currency.code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
