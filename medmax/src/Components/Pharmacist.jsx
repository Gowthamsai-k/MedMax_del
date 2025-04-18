import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import MedicineImg from '../assets/ai-generated-8722616_1920.jpg';

import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from '@mui/icons-material';





const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar1() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    type: '',
    quantity: '',
    price: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get('http://localhost:8080/api/medicines');
    setMedicines(res.data);
  };

  const handleChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/medicines', newMedicine);
    setNewMedicine({ name: '', type: '', quantity: '', price: '' });
    fetchMedicines();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Earnings', 'Orders', 'Payment methods', 'Account'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
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
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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

      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Available Medicines</Typography>
        <Grid container spacing={2}>
          {medicines.map((med) => (
            <Grid item xs={12} sm={6} md={4} key={med.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image={MedicineImg}
                  alt="medicine"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">{med.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Type: {med.type}</Typography>
                  <Typography variant="body2" color="text.secondary">Quantity: {med.quantity}</Typography>
                  <Typography variant="body1" color="text.primary">₹{med.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>Add New Medicine</Typography>
        <form onSubmit={handleAddMedicine} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
          <TextField label="Name" name="name" value={newMedicine.name} onChange={handleChange} margin="normal" required />
          <TextField label="Type" name="type" value={newMedicine.type} onChange={handleChange} margin="normal" required />
          <TextField label="Quantity" name="quantity" type="number" value={newMedicine.quantity} onChange={handleChange} margin="normal" required inputProps={{min:1}}/>
          <TextField label="Price" name="price" type="number" step="0.01" value={newMedicine.price} onChange={handleChange} margin="normal" required />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Medicine</Button>
        </form>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Medicine added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
