import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

// Components
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import NoPage from './Components/NoPage';
import PrimarySearchAppBar from './Components/Primary';
import PrimarySearchAppBar1 from './Components/Pharmacist';
import Addresses from './Components/Addresses';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import PaymentMethods from './Components/PaymentMethods';
import Customer from './Components/Customer';
import Earnings from './Components/Earnings';

function App() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user and address details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) return;

        const userRes = await axios.get(`http://localhost:8080/api/auth/user?email=${email}`);
        setUser(userRes.data);

        const addressesRes = await axios.get(`http://localhost:8080/api/addresses?email=${email}`);
        setAddress(addressesRes.data);
      } catch (err) {
        console.error('Error fetching user or addresses:', err);
      }
    };

    const fetchCartData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) return;

        const cartRes = await axios.get(`http://localhost:8080/api/cart?email=${email}`);
        setCart(cartRes.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchUserDetails();
    fetchCartData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer routes with layout */}
        <Route path="/customer" element={<PrimarySearchAppBar />}>
          <Route
            index
            element={<Customer cart={cart} setCart={setCart} address={address} user={user} />}
          />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} address={address} />} />
          <Route path="orders" element={<Orders user={user} />} />
          <Route path="addresses" element={<Addresses address={address} setAddress={setAddress} />} />
          <Route path="paymentmethods" element={<PaymentMethods />} />
        </Route>

        {/* Pharmacist dashboard layout */}
        <Route path="/pharmacist" element={<PrimarySearchAppBar1 />}>
          <Route index element={<div style={{ padding: '20px' }}><Typography variant="h4">Welcome to Pharmacist Dashboard</Typography></div>} />
          <Route path="earnings" element={<Earnings />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
