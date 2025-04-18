import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/addresses');
      setAddresses(res.data);
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/addresses', { address: newAddress });
      setNewAddress('');
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Addresses</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Address'}
      </button>

      {showForm && (
        <form onSubmit={handleAddAddress} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
            required
            style={{ marginRight: '0.5rem' }}
          />
          <button type="submit">Save</button>
        </form>
      )}

      <ul style={{ marginTop: '1rem' }}>
        {addresses.length > 0 ? (
          addresses.map((addr, index) => <li key={index}>{addr.address}</li>)
        ) : (
          <li>No addresses found</li>
        )}
      </ul>
    </div>
  );
}
