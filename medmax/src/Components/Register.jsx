import React, { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {
  const [user, setUser] = useState({ email: '', password: '', type: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', user);
      alert(res.data);
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ minWidth: 400, padding: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
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
          <TextField
            fullWidth
            label="User Type"
            name="type"
            margin="normal"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={register}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default Register;
