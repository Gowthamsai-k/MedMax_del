import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box
} from '@mui/material';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  Inbox as InboxIcon,
  Mail as MailIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Profile menu handlers
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Fetching medicine data
  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/medicines');
      setMedicines(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setLoading(false);
    }
  };

  // Fetching user address and user details (for example from a profile API)
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/profile');
      setUser(res.data);
      setAddress(res.data.address); // Assuming the address is part of the user profile
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  // Handling the Add to Cart functionality
  const handleAddToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  // Placing the order by sending the data to the backend
  const handlePlaceOrder = async () => {
    if (cart.length === 0 || !address) {
      alert('Please add items to your cart and provide a valid address.');
      return;
    }

    const orderRequest = {
      medicineIds: cart.map((item) => item.id),
      address,
      userId: user.id,
    };

    try {
      const res = await axios.post('http://localhost:8080/api/orders', orderRequest);
      alert('Order placed successfully!');
      setCart([]); // Clear the cart
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place the order');
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchUserDetails(); // Fetch user details including address
  }, []);

  const drawerItems = [
    { text: 'Cart', path: '/cart' },
    { text: 'Orders', path: '/orders' },
    { text: 'Addresses', path: '/addresses' },
    { text: 'Payment methods', path: '/payment-methods' },
    { text: 'Account', path: '/account' },
  ];

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {drawerItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            MedMax
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menus */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Menu>

      <Menu
        id="account-menu-mobile"
        anchorEl={mobileAnchorEl}
        open={Boolean(mobileAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Cart and Order Section */}
      <Box sx={{ margin: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={cart.length === 0}
        >
          Place Order
        </Button>
      </Box>

      {/* Medicines Display */}
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
                  <Typography gutterBottom variant="h6" component="div">
                    {medicine.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{medicine.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {medicine.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(medicine)}
                  >
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
  