import React from 'react';
import { Typography } from '@material-ui/core';
import ProductList from './ProductList';

const Product = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" align="center">
        E-commerce Product Listing
      </Typography>
      <ProductList />
    </div>
  );
};

export default Product;
