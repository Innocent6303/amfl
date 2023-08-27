import React, { useState, useEffect } from 'react';
import { NavbarDark } from './components/NavBar';
import { TableWithStripedColumns } from './components/DataTable';
import PieChart from './components/PriceChart';
import PriceComparisonTable from './components/PriceComparison';


function App() {
  const [scrapedData, setScrapedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isPieChartVisible, setIsPieChartVisible] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const apiUrl = 'http://127.0.0.1:5000';
  const laptopApiUrl = 'http://192.168.0.107:5000'; 
  const currentApiUrl = window.location.hostname === 'localhost' ? apiUrl : laptopApiUrl;

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${currentApiUrl}/api/data`);
      // const response = await fetch('http://127.0.0.1:5000/api/data');
      const jsonData = await response.json();

      if (jsonData) {
        // const combinedData = [...jsonData.flipkart_data, ...jsonData.amazon_data];

        // const filteredResults = combinedData.filter((item) => {
        //   return (
        //     item.name.toLowerCase().includes(query.toLowerCase()) ||
        //     item.company.toLowerCase().includes(query.toLowerCase())
        //   );
        // });
        // setSearchResults(filteredResults);
        setSearchResults([...jsonData.flipkart_data, ...jsonData.amazon_data]);
        setShowComparison(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:5000/api/data');
      const jsonData = await response.json();

      if (jsonData) {
        setScrapedData(jsonData.flipkart_data);
        setSearchResults([...jsonData.flipkart_data, ...jsonData.amazon_data]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <NavbarDark onSearch={handleSearch}onPieChartToggle={() => setIsPieChartVisible(!isPieChartVisible)} />
        <TableWithStripedColumns data ={searchResults} />
        {showComparison && <PriceComparisonTable data={searchResults} />}

        {isPieChartVisible && <PieChart />}


      </header>
    </div>
  );
}

export default App;
