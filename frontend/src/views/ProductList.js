import React from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: Math.random() * (50 - 5) + 5, // Random price between 5 and 50
    image: 'https://example.com/product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product2.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product3.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for Product 4',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product4.jpg',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description for Product 5',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product5.jpg',
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description for Product 6',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product6.jpg',
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'Description for Product 7',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product7.jpg',
  },
  {
    id: 8,
    name: 'Product 8',
    description: 'Description for Product 8',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product8.jpg',
  },
  {
    id: 9,
    name: 'Product 9',
    description: 'Description for Product 9',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product9.jpg',
  },
  {
    id: 10,
    name: 'Product 10',
    description: 'Description for Product 10',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product10.jpg',
  },
  {
    id: 11,
    name: 'Product 11',
    description: 'Description for Product 11',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product11.jpg',
  },
  {
    id: 12,
    name: 'Product 12',
    description: 'Description for Product 12',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product12.jpg',
  },
  {
    id: 13,
    name: 'Product 13',
    description: 'Description for Product 13',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product13.jpg',
  },
  {
    id: 14,
    name: 'Product 14',
    description: 'Description for Product 14',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product14.jpg',
  },
  {
    id: 15,
    name: 'Product 15',
    description: 'Description for Product 15',
    price: Math.random() * (50 - 5) + 5,
    image: 'https://example.com/product15.jpg',
  },
];


const ProductList = () => {
  const sectionSize = 12;
  const sections = Array.from(
    { length: Math.ceil(products.length / sectionSize) },
    (_, index) => products.slice(index * sectionSize, (index + 1) * sectionSize)
  );

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <Grid key={sectionIndex} container spacing={3}>
          {section.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default ProductList;
