import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/home'
import NoPage from './Components/NoPage';
import Layout from './Components/Layout';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonUsage from './Components/carousel';
import PrimarySearchAppBar from './Components/Customer';
import PrimarySearchAppBar1 from './Components/Pharmacist';

function Addresses()
{

}
function Orders()
{

}

function Accounts()
{

}
function PaymentMethods()
{

}
function Cart()
{

}
function App() {
  return (

    /*<BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>*/
  <BrowserRouter>
  <PrimarySearchAppBar />
  <Routes>
    <Route path="/cart" element={<Cart/>} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/addresses" element={<Addresses />} />
    <Route path="/payment-methods" element={<PaymentMethods />} />
    <Route path="/account" element={<Accounts/>} />
  </Routes>
</BrowserRouter>
  

   
  );
}
export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
