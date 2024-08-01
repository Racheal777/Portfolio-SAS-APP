import express from 'express';
import {
  authenticateGoogle,
  googleCallback,
  redirectToProfile,
  getProfile,
  logout
} from '../controllers/googleAuth_controller.js';


export const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

authRouter.get('/auth/google', authenticateGoogle);

authRouter.get('/auth/google/callback', googleCallback, redirectToProfile);

authRouter.get('/profile', getProfile);

authRouter.get('/logout', logout);


