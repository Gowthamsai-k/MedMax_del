import React, { useState } from 'react';
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
  Typography,
  Box
} from '@mui/material';

import {
  Menu as MenuIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  Inbox as InboxIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Open profile menu
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

  // Open mobile menu
  const handleMobileMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);

  // Close menus
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  // Toggle drawer open/close
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Navigate to cart
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Drawer items and routes
  const drawerItems = [
    { text: 'Home', path: '/customer' },
    { text: 'Cart', path: '/customer/cart' },
    { text: 'Orders', path: '/customer/orders' },
    { text: 'Addresses', path: '/customer/addresses' },
    { text: 'Payment methods', path: '/customer/PaymentMethods' },

  ];

  // Drawer list with navigation
  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {drawerItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false); // Close drawer after navigation
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
          {/* Menu Button (Hamburger Icon) for Drawer */}
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MedMax
          </Typography>


          {/* More Button for Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>

        
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
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

      {/* Drawer for Navigation */}
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Page content will render here */}
      <Outlet />
    </Box>
  );
}
