// PieChart.js
const express = require('express');
const Transaction = require('../models/Transaction'); // Import the Transaction model

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const categoryCounts = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(categoryCounts);
  } catch (error) {
    console.error('Failed to generate pie chart data:', error);
    res.status(500).json({ error: 'Failed to generate pie chart data.' });
  }
});

module.exports = router;
