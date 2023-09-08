// CombinedData.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`/list-transactions?month=${month}`),
      axios.get(`/statistics?month=${month}`),
      axios.get(`/bar-chart?month=${month}`),
      axios.get(`/pie-chart?month=${month}`),
    ]);

    res.json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    console.error('Failed to fetch combined data:', error);
    res.status(500).json({ error: 'Failed to fetch combined data.' });
  }
});

module.exports = router;
