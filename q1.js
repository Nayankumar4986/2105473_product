// import React from 'react';
// import Mycom from './component/Mycom'; 
// import ProductList from './component/ProductList'; 

const express = require('express');
const axios = require('axios');
const { isPrime, isFibonacci } = require('mathjs');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];

// Middleware to limit response time
app.use((req, res, next) => {
  const startTime = new Date();
  res.on('finish', () => {
    const duration = new Date() - startTime;
    if (duration > 500) {
      console.log(`Request took too long (${500}ms): ${req.method}, ${req.originalUrl}`);
    }
  });
  next();
});

// Fetch numbers from third-party server
const fetchNumbers = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/test/register');
    return response.data;
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
};

// Calculate average of numbers in the window
const calculateAverage = () => {
  const sum = storedNumbers.slice(-WINDOW_SIZE).reduce((acc, num) => acc + num, 0);
  return sum / Math.min(storedNumbers.length, WINDOW_SIZE);
};

// Route for handling number requests
app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  let numbers = await fetchNumbers();

  // Filter numbers based on type
  switch (type) {
    case 'p':
      numbers = numbers.filter(isPrime);
      break;
    case 'f':
      numbers = numbers.filter(isFibonacci);
      break;
    case 'e':
      numbers = numbers.filter(num => num % 2 === 0);
      break;
    case 'r':
      // Random numbers are assumed to be provided by the third-party server
      break;
    default:
      return res.status(400).send('Invalid number type');
  }

  // Ensure stored numbers are unique and limit to window size
  storedNumbers = [...new Set([...storedNumbers, ...numbers])].slice(-WINDOW_SIZE);

  const avg = calculateAverage();

  res.json({
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    numbers: numbers,
    avg: avg.toFixed(2)
  });
});

// Fetch prime numbers from third-party server
axios.get('http://20.244.56.144/test/primes')
  .then(response => {
    console.log(response.data.numbers);
  })
  .catch(error => {
    console.error('Error fetching prime numbers:', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
