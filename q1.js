// Importing required modules
const express = require('express');
const axios = require('axios');
const { isPrime, isFibonacci } = require('mathjs');

// Creating an Express app
const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];

// Middleware to log request response times
app.use((req, res, next) => {
  const startTime = new Date();
  res.on('finish', () => {
    const duration = new Date() - startTime;
    if (duration > 500) {
      console.log(
        `Request exceeded time limit (${500}ms): ${req.method}, ${
          req.originalUrl
        }`
      );
    }
  });
  next();
});

// Function to fetch numbers from a remote server
const fetchNumbers = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

// Function to calculate the average of numbers in the window
const calculateAverage = () => {
  const sum = storedNumbers
    .slice(-WINDOW_SIZE)
    .reduce((acc, num) => acc + num, 0);
  return sum / Math.min(storedNumbers.length, WINDOW_SIZE);
};

// Route for handling number requests
app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  let numbers = await fetchNumbers();

  // Filter numbers based on type
  switch (type) {
    case 'prime':
      numbers = numbers.filter(isPrime);
      break;
    case 'fibonacci':
      numbers = numbers.filter(isFibonacci);
      break;
    case 'even':
      numbers = numbers.filter((num) => num % 2 === 0);
      break;
    case 'random':
      // Random numbers are assumed to be provided by the third-party server
      break;
    default:
      return res.status(400).send('Invalid number type');
  }

  // Ensure stored numbers are unique and limit to window size
  storedNumbers = [...new Set([...storedNumbers, ...numbers])].slice(
    -WINDOW_SIZE
  );

  const avg = calculateAverage();

  res.json({
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    numbers: numbers,
    avg: avg.toFixed(2),
  });
});

// Fetching prime numbers from a remote server
axios
  .get('http://20.244.56.144/prime-data')
  .then((response) => {
    console.log(response.data.numbers);
  })
  .catch((error) => {
    console.error('Error fetching prime numbers:', error);
  });

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





// the server at http://20.244.56.144/prime-data is returning a status code 404, indicating that the resource was not found.

// Status Code: 404
// Status Text: Not Found
// Response Data: HTML content indicating that the resource was not found
