import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import MedicineImg from '../assets/ai-generated-8722616_1920.jpg';

const Customer = ({ cart, setCart, address, user }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/medicines');
        setMedicines(res.data);
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };
    fetchMedicines();
  }, []);

  const handleAddToCart = (medicine) => {
    const updatedCart = [...cart, medicine];
    setCart(updatedCart);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {medicines.map((medicine) => (
        <Grid item xs={12} sm={6} md={4} key={medicine.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={MedicineImg}
              alt={medicine.name}
            />
            <CardContent>
              <Typography variant="h6">{medicine.name}</Typography>
              <Typography>Price: ₹{medicine.price}</Typography>
              <Typography>Stock: {medicine.quantity}</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(medicine)}
                disabled={medicine.quantity <= 0}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Customer;
