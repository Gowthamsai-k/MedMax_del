// Customer.jsx
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box
} from '@mui/material';
import axios from 'axios';
import MedicineImg from '../assets/ai-generated-8722616_1920.jpg';


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
   

     <Box>
        <Grid container spacing={2} padding={2}>
          {medicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={medicine.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={MedicineImg}
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
      
    </Box>
  );
}
