import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1000&maxPrice=10000');
        
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setLoading(false);
        } else {
          console.error('Invalid response format:', response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Top 10 Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>Product Name: {product.productName}</div>
            <div>Price: {product.price}</div>
            <div>Rating: {product.rating}</div>
            <div>Discount: {product.discount}</div>
            <div>Availability: {product.availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
