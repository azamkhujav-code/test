import { Request, Response } from 'express';

// Mock session store (replace with actual session store in production)
const sessionStore: { [key: string]: string } = {};

export const validateSession = (req: Request, res: Response) => {
  const token = req.cookies.sessionToken;

  if (!token) {
    return res.status(401).json({ valid: false, message: 'No session token found' });
  }

  const userEmail = sessionStore[token];

  if (!userEmail) {
    return res.status(401).json({ valid: false, message: 'Invalid session token' });
  }

  res.json({ valid: true, userEmail });
};