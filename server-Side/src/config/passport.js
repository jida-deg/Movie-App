import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/users.js";
import { getRequiredEnv } from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: getRequiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
      callbackURL: getRequiredEnv("GOOGLE_CALLBACK_URL"),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isVerified: true,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;