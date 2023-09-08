// BarChart.js
const express = require('express');
const Transaction = require('../models/Transaction'); // Import the Transaction model

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      // ... Add more price ranges as needed
    ];

    const priceRangeCounts = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $regex: new RegExp(month, 'i') },
        price: { $gte: range.min, $lte: range.max },
      });

      priceRangeCounts.push({ range: `${range.min} - ${range.max}`, count });
    }

    res.json(priceRangeCounts);
  } catch (error) {
    console.error('Failed to generate bar chart data:', error);
    res.status(500).json({ error: 'Failed to generate bar chart data.' });
  }
});

module.exports = router;
