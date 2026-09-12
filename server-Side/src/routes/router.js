import express from "express";

import { getUser, postUser, loginUser,verifyEmail, logoutUser, getCurrentUser, forgotPassword, resetPassword, } from "../controller/userController.js";
import { combinedAuthMiddleware } from "../middleware/auth.js";
import passport from "passport";
import { getNotifications } from "../controller/notificationController.js";
import jwt from 'jsonwebtoken';
import { frontendUrl, jwtSecret } from "../config/env.js";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${frontendUrl}/signin?error=google-authentication`
  }),
  (req, res) => {
    // Generate JWT token for the authenticated user
    const payload = {
      userId: req.user._id,
      email: req.user.email
    };
    
 
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    

    // Redirect to frontend route that will process OAuth results (GoogleSuccess)
    // ensure the path matches the SPA route and include the same port as dev server
    const frontend = frontendUrl.replace(/\/$/, ''); // trim trailing slash
    res.redirect(`${frontend}/google-success?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }))}`);
  }
);
// Protected route
router.get("/notifications", combinedAuthMiddleware, getNotifications);
router.post("/register", postUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);

// password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/", combinedAuthMiddleware, getUser);
router.get("/me", combinedAuthMiddleware, getCurrentUser);
router.post("/logout", combinedAuthMiddleware, logoutUser);


export default router