import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Replace with your server URL

const api = axios.create({
  baseURL,
});

function App() {
  const [greeting, setGreeting] = useState('');
  const [textInput, setTextInput] = useState('');
  const [message, setMessage] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const result = await api.get('/');
        setGreeting(result.data);
      } catch (error) {
        console.error('Error fetching the greeting:', error);
      }
    };

    fetchGreeting();
  }, []);



  const handleWrite = async () => {
    try {
      await api.post('/write', { message: textInput });
      setTextInput('');
    } catch (error) {
      console.error('Error posting the message:', error);
    }
  };

  const handleRead = async () => {
    try {
      const response = await api.get('/message');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching the message:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await api.post('/register', { username: registerUsername, password: registerPassword });
    } catch (error) {
      setError('Error registering user');
    }
  };

  const handleLogin = async () => {
    try {
      await api.post('/login', { username: loginUsername, password: loginPassword });
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Greeting from the root: {greeting ? greeting : ""}</h1>
      </header>

      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter new message"
      />
      <button onClick={handleWrite}>Write to file</button>
      <button onClick={handleRead}>Read from file</button>
      {message && <p>Message: {message}</p>}

      <div>
        <h2>Register</h2>
        <input
          type="text"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;