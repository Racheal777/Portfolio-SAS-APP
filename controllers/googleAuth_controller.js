import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {User} from '../models/user_model.js'; // Adjust the path to your user model
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log('Profile:', profile);
  
    // const user = {
    //   profile: profile,
    //   accessToken: accessToken,
    //   refreshToken: refreshToken
    // };
  
    try {
      const newUser = await User.create(profile);
      console.log('New User:', newUser);
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  export const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });
  
  export const googleCallback = passport.authenticate('google', { failureRedirect: '/' });
  
  export const handleGoogleCallback = (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/profile?token=${token}`);
  };
  
  export const redirectToProfile = (req, res) => {
    res.redirect('/profile');
  };
  
  export const getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.send(`Hello, ${req.user.profile.displayName}`);
  };
  
  export const logout = (req, res) => {
    req.logout(err => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  };