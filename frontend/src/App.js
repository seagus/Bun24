import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Replace with your server URL

const api = axios.create({
  baseURL,
});

function App() {
  const [data, setData] = useState('');
  const [textInput, setTextInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get('/');
        setData(result.data); // Assuming result is an Axios response object
      } catch (error) {
        // Handle error as needed
      }
    };
  
    fetchData();
  }, []);
  


  const handleSubmit = async () => {
    try {
      await api.post('/submit', { text: textInput });
      setTextInput(''); // Clear the input field
    } catch (error) {
      // Handle error as needed
    }
  };

  const handleShowHash = async () => {
    try {
      const response = await api.get('/hash');
      setHash(response.data.hash);
    } catch (error) {
      // Handle error as needed
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from the root: {data ? data : ""}</h1>
      </header>

      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleShowHash}>Show Hash</button>
      {hash && <p>Hash: {hash}</p>}
    </div>
  );
}

export default App;