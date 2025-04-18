import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import NoPage from './Components/NoPage';
import PrimarySearchAppBar from './Components/Primary';
import PrimarySearchAppBar1 from './Components/Pharmacist';
import Addresses from './Components/Addresses';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Accounts from './Components/Accounts';
import PaymentMethods from './Components/PaymentMethods';
import Customer from './Components/Customer';
import Earnings from './Components/Earnings';

function App() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const userRes = await axios.get('http://localhost:8080/api/user/profile');
      setUser(userRes.data);

      const addressesRes = await axios.get('http://localhost:8080/api/addresses');
      setAddress(addressesRes.data);
    } catch (err) {
      console.error('Error fetching user details or addresses:', err);
    }
  };

  const fetchCartData = async () => {
    try {
      const cartRes = await axios.get('http://localhost:8080/api/cart');
      setCart(cartRes.data);
    } catch (err) {
      console.error('Error fetching cart data:', err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default landing page is Home */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for Customer */}
        <Route path="/customer" element={<PrimarySearchAppBar />}>
          <Route index element={<Customer cart={cart} setCart={setCart} address={address} user={user} />} />
          <Route path="cart" element={<Cart cart={cart} />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="paymentmethods" element={<PaymentMethods />} />
          <Route path="account" element={<Accounts />} />
        </Route>

        {/* Pharmacist Routes */}
        <Route path="/pharmacist" element={<PrimarySearchAppBar1 />}>
          <Route path="earnings" element={<Earnings />} />
          <Route path="account" element={<Accounts />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
