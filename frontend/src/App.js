import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Replace with your server URL

const api = axios.create({
  baseURL,
});

const getHelloWorld = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHelloWorld();
        setData(result);
      } catch (error) {
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data}</h1>
      </header>
    </div>
  );
}

export default App;