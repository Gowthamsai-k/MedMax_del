import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, TextField, Typography, Grid, Paper } from '@mui/material';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/addresses');
      setAddresses(res.data);
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/addresses', { address: newAddress });
      setNewAddress('');
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  return (
    <Paper sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>Your Addresses</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginBottom: '1rem' }}
      >
        {showForm ? 'Cancel' : 'Add Address'}
      </Button>

      {showForm && (
        <Card sx={{ marginBottom: '1rem', padding: '1rem' }}>
          <CardContent>
            <form onSubmit={handleAddAddress}>
              <TextField
                label="New Address"
                fullWidth
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
                sx={{ marginBottom: '1rem' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Address
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {addresses.length > 0 ? (
        <Grid container spacing={2}>
          {addresses.map((addr, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ padding: '1rem' }}>
                <CardContent>
                  <Typography variant="body1">{addr.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No addresses found</Typography>
      )}
    </Paper>
  );
}
