// ListTransactions.js
const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;

  // Build the query to filter transactions based on the 'dateOfSale' field and search
  const query = {
    dateOfSale: { $regex: new RegExp(month, 'i') },
    $or: [
      { title: { $regex: new RegExp(search, 'i') } },
      { description: { $regex: new RegExp(search, 'i') } },
      { price: { $regex: new RegExp(search, 'i') } },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json(transactions);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions.' });
  }
});

module.exports = router;
