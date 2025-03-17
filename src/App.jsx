import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import NewsList from "./Components/Newslist";

function GMXInterface() {
  const [news, setNews] = useState([]);
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0, GMX: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cryptoInfo, setCryptoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsFilter, setNewsFilter] = useState("all");
  const [priceChangePercent, setPriceChangePercent] = useState({ BTC: 0, ETH: 0, GMX: 0 });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = "https://cryptopanic.com/api/free/v1/posts/?auth_token=86817b636952252ed96c2b6b6e38cc8ec01b5972";
        
        if (newsFilter !== "all") {
          url += `&currencies=${newsFilter.toUpperCase()}`;
        }

        const response = await axios.get(url);
        console.log("News Response:", response.data);
        
        if (response.data && response.data.results) {
          setNews(response.data.results);
        } else {
          console.error("Invalid news data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error.message);
        setNews([]);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [newsFilter]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,gmx&vs_currencies=usd&include_24hr_change=true"
        );
        setPrices({
          BTC: response.data.bitcoin.usd,
          ETH: response.data.ethereum.usd,
          GMX: response.data.gmx.usd,
        });
        setPriceChangePercent({
          BTC: response.data.bitcoin.usd_24h_change,
          ETH: response.data.ethereum.usd_24h_change,
          GMX: response.data.gmx.usd_24h_change,
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCryptoSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${searchQuery.toLowerCase().trim()}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true`
      );
      setCryptoInfo(response.data);
      setError(null);
    } catch (error) {
      setError("Cryptocurrency not found or API error. Please try again.");
      setCryptoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white w-screen m-0 p-0 overflow-hidden">
      <Navbar 
        toggleSidebar={toggleSidebar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleCryptoSearch={handleCryptoSearch}
      />

      <div className="flex flex-1 w-full relative">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className={`flex-1 text-center p-10 transition-all duration-300 ${sidebarOpen ? "ml-52" : ""}`}>
          <h1 className="text-4xl font-bold">Trade & Invest in Crypto with GMX</h1>
          <p className="mt-3 text-gray-400">Fast, secure, and decentralized trading experience.</p>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Loading cryptocurrency data...</p>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto my-4 p-4 bg-red-900/20 text-red-500 rounded text-center">
              {error}
            </div>
          )}

          {cryptoInfo && (
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 mt-4">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={cryptoInfo.image.large} 
                  alt={cryptoInfo.name} 
                  className="w-16 h-16"
                />
                <div>
                  <h2 className="text-2xl font-bold">{cryptoInfo.name}</h2>
                  <p className="text-gray-400">{cryptoInfo.symbol.toUpperCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Price Information</h3>
                  <p className="text-2xl font-bold text-green-500">
                    ${cryptoInfo.market_data.current_price.usd.toLocaleString()}
                  </p>
                  <p className="text-gray-400 mt-2">
                    24h Change: 
                    <span className={cryptoInfo.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                      {' '}{cryptoInfo.market_data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Market Stats</h3>
                  <p>Market Cap: ${cryptoInfo.market_data.market_cap.usd.toLocaleString()}</p>
                  <p>Market Cap Rank: #{cryptoInfo.market_cap_rank}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <div 
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: cryptoInfo.description.en }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center gap-5 py-8">
            {Object.entries(prices).map(([coin, price]) => (
              <div key={coin} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-bold">{coin}</h2>
                <p className="text-green-500 text-xl">${price}</p>
              </div>
            ))}
          </div>

          <NewsList 
            news={news} 
            newsFilter={newsFilter}
            setNewsFilter={setNewsFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default GMXInterface;
