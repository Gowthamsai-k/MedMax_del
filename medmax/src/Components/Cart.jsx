import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ cart, setCart, address }) => {
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState('weekly');
  const navigate = useNavigate();

  useEffect(() => {
    if (address && address.length > 0) {
      setSelectedAddress(address[0]);
    }
  }, [address]);

  useEffect(() => {
    console.log('Cart:', cart);
    console.log('Address List:', address);
    console.log('Selected Address:', selectedAddress);
  }, [cart, address, selectedAddress]);

  const calculateTotal = () => {
    let subtotal = cart.reduce((total, item) => total + item.price, 0);
    const deliveryCharge = subtotal * 0.01;
    const tax = subtotal * 0.02;
    return (subtotal + deliveryCharge + tax).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setOrderStatus('Cart is empty!');
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      }));

      const orderData = {
        email: localStorage.getItem('email'),
        items: orderItems,
        address: selectedAddress,
        total: parseFloat(calculateTotal()),
        date: new Date().toISOString(),
        status: 'Pending',
        recurring: isRecurring,
        recurrenceFrequency: isRecurring ? recurrence : null,
      };

      const response = await axios.post('http://localhost:8080/api/orders', orderData);

      if (response.status === 200) {
        setCart([]);
        setOrderStatus('success');
        alert('Order placed!');
        navigate('/customer/orders', {
          state: {
            orderPlaced: true,
            orderId: response.data.id,
          },
          replace: true,
        });
      } else {
        setOrderStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus(error.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Selected Address */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>Delivery Address</Typography>
            {selectedAddress ? (
              <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                <Typography>{selectedAddress.street}</Typography>
                <Typography>{selectedAddress.city}</Typography>
                <Typography>{selectedAddress.state} - {selectedAddress.zip}</Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/customer/addresses')}
                  sx={{ mt: 1 }}
                >
                  Change Address
                </Button>
              </Paper>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate('/customer/addresses')}
                sx={{ mb: 2 }}
              >
                Add Delivery Address
              </Button>
            )}
          </Box>

          {/* Order Summary */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography>Subtotal: ₹{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</Typography>
            <Typography>Delivery Charge (1%): ₹{(cart.reduce((total, item) => total + item.price, 0) * 0.01).toFixed(2)}</Typography>
            <Typography>Tax (2%): ₹{(cart.reduce((total, item) => total + item.price, 0) * 0.02).toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ₹{calculateTotal()}
            </Typography>
          </Box>

          {/* Recurring Order Option */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Recurring Order</Typography>
            <Button
              variant={isRecurring ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setIsRecurring(!isRecurring)}
              sx={{ mt: 1 }}
            >
              {isRecurring ? "Recurring Enabled" : "Set as Recurring Order"}
            </Button>

            {isRecurring && (
              <Box sx={{ mt: 2 }}>
                <Typography>Select Frequency:</Typography>
                <Button
                  variant={recurrence === 'daily' ? 'contained' : 'outlined'}
                  onClick={() => setRecurrence('daily')}
                  sx={{ mr: 1 }}
                >
                  Daily
                </Button>
                <Button
                  variant={recurrence === 'weekly' ? 'contained' : 'outlined'}
                  onClick={() => setRecurrence('weekly')}
                  sx={{ mr: 1 }}
                >
                  Weekly
                </Button>
                <Button
                  variant={recurrence === 'monthly' ? 'contained' : 'outlined'}
                  onClick={() => setRecurrence('monthly')}
                >
                  Monthly
                </Button>
              </Box>
            )}
          </Box>

          {orderStatus && (
            <Alert
              severity={orderStatus === 'success' ? 'success' : 'error'}
              sx={{ mb: 2, mt: 2 }}
            >
              {orderStatus === 'success'
                ? 'Order placed successfully! Redirecting to orders...'
                : orderStatus}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            fullWidth
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Place Order'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
