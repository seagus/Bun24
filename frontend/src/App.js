import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  IconButton,
  Collapse,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const baseURL = 'http://localhost:8080'; // Replace with your server URL

const api = axios.create({
  baseURL,
});

const App = () => {
  const [greeting, setGreeting] = useState('');
  const [textInput, setTextInput] = useState('');
  const [alert, setAlert] = useState({ text: '', severity: 'success', open: false });
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');

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

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleWrite = async () => {
    try {
      if (!textInput) {
        throw new Error('Cannot write an empty message');
      }

      await api.post('/write', { message: textInput });
      setTextInput('');
      setAlert({ text: 'Message was successfully written to the file', severity: 'success', open: true });
    } catch (error) {
      console.error('Error posting the message:', error);
      setAlert({ text: error.response?.data.error || 'Error writing to the file, message cannot be empty', severity: 'error', open: true });
    }
  };

  const handleRead = async () => {
    try {
      const response = await api.get('/read');
      setMessage(response.data.message);
      setAlert({ text: "Message was successfully read", severity: 'success', open: true });
    } catch (error) {
      console.error('Error making a request:', error);
      setAlert({ text: error.response?.data.error || 'Error reading the file', severity: 'error', open: true });
    }
  };

  const handleRegister = async () => {
    try {
      await api.post('/register', { username: registerUsername, password: registerPassword });
      setAlert({ text: 'User registered successfully', severity: 'success', open: true });
    } catch (error) {
      console.error('Error registering:', error);
      setAlert({ text: error.response?.data.error || 'Error creating a new user. Username must be unique', severity: 'error', open: true });
    }
  };

  const handleLogin = async () => {
    try {
      await api.post('/login', { username: loginUsername, password: loginPassword });
      setAlert({ text: 'Login was successful!', severity: 'success', open: true });
    } catch (error) {
      console.error('Error logging in:', error);
      setAlert({ text: error.response?.data.error || 'Login failed.', severity: 'error', open: true });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Collapse in={alert.open}>
        <Alert
          severity={alert.severity}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, position: 'fixed', top: 0, left: "50%", transform: 'translateX(-50%)', width: '100%', zIndex: 9999 }}

        >
          {alert.text}
        </Alert>
      </Collapse>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "50px" }}>

        <Typography component="h1" variant="h5">
          Greeting from the root: {greeting || ''}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          id="textInput"
          label="Enter new message"
          name="textInput"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleWrite}>
              Write to file
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleRead}>
              Read from file
            </Button>
          </Grid>
        </Grid>
        {message !== '' && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '8px', margin: '14px', display: 'flex', alignItems: 'flex-start' }}>
              <Grid item xs={9} style={{ maxWidth: '100%', margin: '14px' }}>
                <Typography variant="h6" gutterBottom>
                  Here is the message from the backend file:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {message}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  aria-label="close"
                  onClick={() => setMessage('')}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Paper>
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Register</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="registerUsername"
              label="Username"
              name="registerUsername"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="registerPassword"
              label="Password"
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="loginUsername"
              label="Username"
              name="loginUsername"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="loginPassword"
              label="Password"
              type="password"
              id="loginPassword"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
