// Statistics.js
const express = require('express');
const Transaction = require('../models/Transaction'); // Import the Transaction model

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: '$price' },
          totalSoldItems: { $sum: 1 },
        },
      },
    ]);

    const totalUnsoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.totalSaleAmount || 0,
      totalSoldItems: totalSaleAmount[0]?.totalSoldItems || 0,
      totalUnsoldItems,
    });
  } catch (error) {
    console.error('Failed to calculate statistics:', error);
    res.status(500).json({ error: 'Failed to calculate statistics.' });
  }
});

module.exports = router;
