import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import ProfileImg from '../assets/images.png';

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem('email');
        const res = await axios.get(`http://localhost:8080/api/auth/user?email=${email}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Typography variant="h6" color="error" align="center">User not found.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 1400, margin: '2rem auto', borderRadius: 3, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="500"
        image={ProfileImg}
        alt="Profile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Account Info
        </Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>User Type:</strong> {user.type}</Typography>
      </CardContent>
    </Card>
  );
}
