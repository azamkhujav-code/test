const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(express.json());

// Use authentication routes
app.use('/api', authRoutes);

// SSL/TLS configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});

// HTTP server (only for redirecting to HTTPS)
app.listen(80, () => {
  console.log('HTTP Server running on port 80 (redirecting to HTTPS)');
});