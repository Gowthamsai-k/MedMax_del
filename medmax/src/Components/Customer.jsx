// Customer.jsx
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box
} from '@mui/material';
import axios from 'axios';

export default function Customer({ cart, setCart, address, user }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (cart.length === 0 || !address) {
            alert('Add items and address first.');
            return;
          }
          axios.post('http://localhost:8080/api/orders', {
            medicineIds: cart.map(m => m.id),
            address,
            userId: user.id
          }).then(() => {
            alert('Order placed!');
            setCart([]);
          }).catch(() => alert('Failed to place order'));
        }}
        disabled={cart.length === 0}
      >
        Place Order
      </Button>

      {loading ? (
        <CircularProgress sx={{ m: 4 }} />
      ) : (
        <Grid container spacing={2} padding={2}>
          {medicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={medicine.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={medicine.imageUrl || 'https://via.placeholder.com/150'}
                  alt={medicine.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">{medicine.name}</Typography>
                  <Typography>Price: ₹{medicine.price}</Typography>
                  <Typography>Quantity: {medicine.quantity}</Typography>
                  <Button variant="outlined" onClick={() => handleAddToCart(medicine)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
