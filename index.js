const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // For loading environment variables

dotenv.config(); // Load environment variables from .env file (if available)

const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Middleware to parse JSON requests
app.use(express.json());

// Include route handlers from separate files
app.use('/initialize-database', require('./routes/InitializeDatabase'));
app.use('/list-transactions', require('./routes/ListTransactions'));
app.use('/statistics', require('./routes/Statistics'));
app.use('/bar-chart', require('./routes/BarChart'));
app.use('/pie-chart', require('./routes/PieChart'));
app.use('/combined-data', require('./routes/CombinedData'));

// Handle 404 errors (route not found)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Handle other errors (e.g., unhandled exceptions)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
