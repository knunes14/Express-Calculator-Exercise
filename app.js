const express = require('express');
const app = express();

app.use(express.json());

// Helper function to check if an array contains any NaN values
function containsNaN(arr) {
  return arr.some((num) => isNaN(num));
}

// Calculate the Mean
app.get('/mean', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }

  const numsArray = nums.split(',').map(Number);

  if (containsNaN(numsArray)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums.' });
  }

  const mean = numsArray.reduce((acc, num) => acc + num, 0) / numsArray.length;

  res.json({ operation: 'mean', value: mean });
});

// Calculate the Median
app.get('/median', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }

  const numsArray = nums.split(',').map(Number);

  if (containsNaN(numsArray)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums.' });
  }

  numsArray.sort((a, b) => a - b);
  let median;

  if (numsArray.length % 2 === 0) {
    const mid1 = numsArray[numsArray.length / 2 - 1];
    const mid2 = numsArray[numsArray.length / 2];
    median = (mid1 + mid2) / 2;
  } else {
    median = numsArray[Math.floor(numsArray.length / 2)];
  }

  res.json({ operation: 'median', value: median });
});

// Calculate the mode
app.get('/mode', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }

  const numsArray = nums.split(',').map(Number);
  const countMap = {};
  let maxCount = 0;
  let mode = [];

  if (containsNaN(numsArray)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums.' });
  }

  numsArray.forEach((num) => {
    countMap[num] = (countMap[num] || 0) + 1;

    if (countMap[num] > maxCount) {
      maxCount = countMap[num];
      mode = [num];
    } else if (countMap[num] === maxCount) {
      mode.push(num);
    }
  });

  res.json({ operation: 'mode', value: mode });
});

// Start the server only when this file is run directly, not when imported
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log(`App is running on port ${port}`);
  });
}

module.exports = app; // Export the app if needed for testing
// app.listen(3000, function () {
//   console.log('App on port 3000');
// })
