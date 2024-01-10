import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const baseURL = 'http://localhost:8080'; // Replace with your server URL

const api = axios.create({
  baseURL,
});

const App = () => {
  const [greeting, setGreeting] = useState('');
  const [textInput, setTextInput] = useState('');
  const [message, setMessage] = useState({ text: '', severity: '', open: true });
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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
    setMessage({ ...message, open: false });
  };

  const handleWrite = async () => {
    try {
      if (!textInput) {
        throw new Error('Cannot write an empty message');
      }

      await api.post('/write', { message: textInput });
      setTextInput('');
      setMessage({ text: 'Message was successfully written to the file', severity: 'success', open: true });
    } catch (error) {
      console.error('Error posting the message:', error);
      setMessage({ text: 'Error writing to the file, message cannot be empty', severity: 'error', open: true });
    }
  };

  const handleRead = async () => {
    try {
      const response = await api.get('/message');
      setMessage({ text: response.data.message, severity: 'success', open: true });
    } catch (error) {
      console.error('Error making a request:', error);
      setMessage({ text: 'Error reading the file', severity: 'error', open: true });
    }
  };

  const handleRegister = async () => {
    try {
      await api.post('/register', { username: registerUsername, password: registerPassword });
      setMessage({ text: 'User registered successfully', severity: 'success', open: true });
    } catch (error) {
      console.error('Error registering:', error);
      setMessage({ text: 'Username must be unique', severity: 'error', open: true });
    }
  };

  const handleLogin = async () => {
    try {
      await api.post('/login', { username: loginUsername, password: loginPassword });
      setMessage({ text: 'Login was successful!', severity: 'success', open: true });
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage({ text: 'Wrong credentials', severity: 'error', open: true });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Collapse in={message.open}>
          <Alert
            severity={message.severity}
            action={
              <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {message.text}
          </Alert>
        </Collapse>
        <Typography component="h1" variant="h5">
          Greeting from the root: {greeting || ''}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
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
