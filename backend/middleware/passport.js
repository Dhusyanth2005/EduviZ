const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getDb } = require('../config/db');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user._id ? user._id.toString() : user.id); // Handle both MongoDB and Google users
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: require('mongodb').ObjectId(id) });
    if (user) {
      done(null, user);
    } else {
      done(null, { id }); // For Google users not stored in DB
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const db = getDb();
      let user = await db.collection('users').findOne({ email: profile.emails[0].value });
      if (!user) {
        user = {
          email: profile.emails[0].value,
          fullName: profile.displayName,
          googleId: profile.id,
          createdAt: new Date(),
        };
        await db.collection('users').insertOne(user);
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;