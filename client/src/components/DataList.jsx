import React, { useEffect, useState } from 'react';

// Component to display paginated data list
const DataList = () => {
  const [items, setItems] = useState([]);         // State for all items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(3);             // Items to display per page
  const [error, setError] = useState('');         // Error message state

  // Function to fetch data from JSON file
  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setItems(data);
      setError('');
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Unable to load data. Please try again later.');
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Paginated Data List</h2>

      {/* Show error if exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the data items */}
      <ul>
        {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataList;
