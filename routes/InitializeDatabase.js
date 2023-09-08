// InitializeDatabase.js
const axios = require('axios');
const mongoose = require('mongoose');

const Transaction = require('../models/Transaction'); // Import the Transaction model

async function initializeDatabase() {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const seedData = response.data;

    await Transaction.insertMany(seedData); // Insert the seed data into the database

    console.log('Database initialized with seed data.');
  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
}

module.exports = initializeDatabase; // Export the initialization function
