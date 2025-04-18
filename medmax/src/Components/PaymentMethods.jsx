import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Paper } from '@mui/material';

const paymentMethods = [
  { id: 1, type: 'Credit Card', last4: '1234', icon: '💳' },
  { id: 2, type: 'Debit Card', last4: '5678', icon: '💳' },
  { id: 3, type: 'PayPal', last4: '', icon: '💰' },
  { id: 4, type: 'Google Pay', last4: '', icon: '📱' },
];

export default function PaymentMethods() {
  return (
    <Paper sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>Your Payment Methods</Typography>

      <Grid container spacing={2}>
        {paymentMethods.map((method) => (
          <Grid item xs={12} sm={6} md={4} key={method.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
              <Typography variant="h4" sx={{ marginRight: '1rem' }}>
                {method.icon}
              </Typography>
              <CardContent>
                <Typography variant="h6">{method.type}</Typography>
                <Typography variant="body2">
                  {method.last4 ? `**** **** **** ${method.last4}` : 'No account linked'}
                </Typography>
              </CardContent>
              <Button variant="outlined" color="primary">Edit</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
        Add New Payment Method
      </Button>
    </Paper>
  );
}
