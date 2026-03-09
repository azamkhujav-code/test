import express from 'express';
import cookieParser from 'cookie-parser';
import { validateSession } from './api/validateSession';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.post('/api/validate-session', validateSession);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});