const express = require('express');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use authentication routes
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});