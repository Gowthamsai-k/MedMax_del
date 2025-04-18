import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Skeleton } from '@mui/material';

import scooterImg from '../assets/scooter-6753797_1280.jpg';

import capsulesImg from '../assets/capsules-1079838_1280.jpg';

export default function CarouselUsage() {
  const [loading, setLoading] = React.useState(true);

  const items = [
    {
      name: "Scheduled Deliveries",
      description: "Experience the serenity of golden hour.",
      image: scooterImg
    },
    {
      name: "Higher medicine availability",
      description: "Breathe in the fresh forest air.",
      image: capsulesImg
    }
  ];

  // Simulate loading (e.g., fetching data or waiting for images)
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 2s loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        // Skeleton Loader View
        <Box sx={{ p: 4 }}>
          {[1, 2].map((_, i) => (
            <Paper
              key={i}
              elevation={2}
              sx={{
                p: 4,
                m: 2,
                backgroundColor: '#fff',
                borderRadius: '12px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Skeleton variant="rectangular" width={500} height={300} sx={{ borderRadius: '12px' }} />
                <Box>
                  <Skeleton variant="text" width={200} height={40} />
                  <Skeleton variant="text" width={200} />
                  <Skeleton variant="text" width={250} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        // Actual Carousel View
        <Carousel
          animation="fade"
          indicatorIconButtonProps={{
            style: {
              padding: '8px',
              color: '#c4c4c4'
            }
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#1976d2'
            }
          }}
          indicatorContainerProps={{
            style: {
              marginTop: '20px',
              textAlign: 'center'
            }
          }}
        >
          {items.map((item, i) => (
            <Paper
              key={i}
              elevation={2}
              sx={{
                p: 4,
                m: 2,
                backgroundColor: '#fff',
                borderRadius: '12px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '500px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
                <Box>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ maxWidth: '500px' }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Carousel>
      )}
    </>
  );
}
