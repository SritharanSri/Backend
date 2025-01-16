import express from 'express';

const router = express.Router();

// Define routes on the router
router.get('/', (req, res) => {
  res.send('Hello from the API route!');
});
app.use('/.netlify/functions/api', router);