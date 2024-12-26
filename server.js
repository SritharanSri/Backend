/*const app = require('./src/app'); // Import the Express application
//const dotenv = require('dotenv'); // Load environment variables
require('dotenv').config(); */

import app from './src/app.js'; // Use ES Module import
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the port
const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
