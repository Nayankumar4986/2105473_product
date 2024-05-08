2105473  
exam   I do ques 1-> Develope Average Calculator HTTP Microservice
(q1.js)

<br/>
















const express = require('express');
const axios = require('axios');
const { isPrime, isFibonacci } = require('mathjs');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];

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

const fetchNumbers = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/data', {
      headers: {
        Authorization: 'Bearer <your_access_token>'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

const calculateAverage = () => {
  const sum = storedNumbers
    .slice(-WINDOW_SIZE)
    .reduce((acc, num) => acc + num, 0);
  return sum / Math.min(storedNumbers.length, WINDOW_SIZE);
};

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  let numbers = await fetchNumbers();

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
      break;
    default:
      return res.status(400).send('Invalid number type');
  }

  storedNumbers = [...new Set([...storedNumbers, ...numbers])].slice(-WINDOW_SIZE);

  const avg = calculateAverage();

  res.json({
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    numbers: numbers,
    avg: avg.toFixed(2),
  });
});

axios
  .get('http://20.244.56.144/prime-data', {
    headers: {
      Authorization: 'Bearer < ACCESS TOKEN I DID NOT GET FROM SERVER SIDE ISSUE I can't regiter for reference i attach screenshot in (1.png) >'
    }
  })
  .then((response) => {
    console.log(response.data.numbers);
  })
  .catch((error) => {
    console.error('Error fetching prime numbers:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
