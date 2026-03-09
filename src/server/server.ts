import express from 'express';
import cookieParser from 'cookie-parser';
import { login, logout, checkAuth } from './auth.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

// Authentication routes
app.post('/api/login', login);
app.post('/api/logout', logout);
app.get('/api/check-auth', checkAuth);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;