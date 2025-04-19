import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Paper,
  Grid,
  Alert
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem('email');
        if (!email) {
          setError('User not logged in');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/orders', {
          params: { email }
        });

        // If no orders found, set dummy order
        if (response.data.length === 0) {
          setOrders([
            {
              id: 'y394720bfkhu1324u-',
              date: new Date().toISOString(),
              status: 'Processing',
              address: {
                street: '123 Test Street',
                city: 'hyderabad',
                state: 'Telanagana',
                zip: '500008',
              },
              items: [
                { name: 'Dolo', quantity: 2, price: 40 },
                { name: 'Volini', quantity: 1, price: 140 },
                { name: 'paracetmol', quantity: 1, price: 10 },
              ],
              total: 135
            }
          ]);
        } else {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography>Loading orders...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {location.state?.orderPlaced && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Order placed successfully!
        </Alert>
      )}

      {orders.length === 0 ? (
        <Typography variant="h6">No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} key={order.id || index}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2,
                  border: location.state?.orderId === order.id ? '2px solid #4caf50' : 'none'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Order #{order.id ? order.id.substring(0, 8) : index + 1}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Typography color="primary" gutterBottom>
                  Status: {order.status}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Delivery Address:
                  </Typography>
                  <Typography>
                    {order.address.street}<br />
                    {order.address.city}<br />
                    {order.address.state} - {order.address.zip}
                  </Typography>
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                  Items:
                </Typography>
                <List>
                  {order.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} | Price: ₹${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="h6">
                    Total: ₹{order.total}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Orders;
