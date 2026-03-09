import { Request, Response } from 'express';

// This is a placeholder for a real session store
const sessions: { [key: string]: string } = {};

export const validateSession = (req: Request, res: Response) => {
  const token = req.cookies.sessionToken;

  if (!token) {
    return res.status(401).json({ valid: false, message: 'No session token provided' });
  }

  const userEmail = sessions[token];

  if (!userEmail) {
    return res.status(401).json({ valid: false, message: 'Invalid session token' });
  }

  res.json({ valid: true, userEmail });
};

export const createSession = (userEmail: string): string => {
  const token = Math.random().toString(36).substr(2);
  sessions[token] = userEmail;
  return token;
};

export const clearSession = (token: string): void => {
  delete sessions[token];
};