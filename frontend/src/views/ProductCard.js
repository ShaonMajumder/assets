import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

const ProductCard = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Product Image"
        height="200"
        image="https://plus.unsplash.com/premium_photo-1675896042153-9dc08f9c9599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=635&q=80"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Product Name
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <del>৳19.99</del> ৳14.99
        </Typography>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
