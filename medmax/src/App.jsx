import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'; // Make sure axios is imported
import PrimarySearchAppBar from './Components/Primary';
import Customer from './Components/Customer';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Addresses from './Components/Addresses';
import PaymentMethods from './Components/PaymentMethods';
import Accounts from './Components/Accounts';
import NoPage from './Components/NoPage';

function App() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const userRes = await axios.get('http://localhost:8080/api/user/profile');
      setUser(userRes.data);
    
      // Fetching the user's addresses from /api/addresses
      const addressesRes = await axios.get('http://localhost:8080/api/addresses');
      setAddress(addressesRes.data);  // Assuming the response is an array of addresses
    } catch (err) {
      console.error('Error fetching user details or addresses:', err);
    }
  };

  const fetchCartData = async () => {
    try {
      const cartRes = await axios.get('http://localhost:8080/api/cart');
      setCart(cartRes.data);  // Assuming cartRes.data is an array of cart items
    } catch (err) {
      console.error('Error fetching cart data:', err);
    }
  };

  // Fetch user details and cart data when component mounts
  useEffect(() => {
    fetchUserDetails();
    fetchCartData();  // Fetch cart info
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrimarySearchAppBar />}>
          <Route
            index
            element={<Customer cart={cart} setCart={setCart} address={address} user={user} />}
          />
          <Route path="cart" element={<Cart cart={cart} />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="account" element={<Accounts />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Rendering the app to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
