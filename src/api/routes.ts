import { Request, Response } from 'express';
import { validateSession, createSession, clearSession } from './validateSession';

export const configureApiRoutes = (app: any) => {
  app.post('/api/validate-session', (req: Request, res: Response) => {
    validateSession(req, res);
  });

  app.post('/api/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    // In a real application, you would validate the email and password here
    if (email && password) {
      const token = createSession(email);
      res.cookie('sessionToken', token, { httpOnly: true, secure: true });
      res.json({ success: true, email });
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  });

  app.post('/api/logout', (req: Request, res: Response) => {
    const token = req.cookies.sessionToken;
    if (token) {
      clearSession(token);
      res.clearCookie('sessionToken');
    }
    res.json({ success: true });
  });
};