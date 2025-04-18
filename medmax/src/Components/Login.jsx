import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', credentials);
      alert(`${res.data.message}\nUser Type: ${res.data.type}`);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '90vh',
        width: '98vw',
        backgroundColor: '#F2EFE7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
    >
      <Card sx={{ minWidth: 400, padding: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={login}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default Login;
