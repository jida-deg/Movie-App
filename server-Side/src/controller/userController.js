import User from "../model/users.js"
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";
import Notification from "../model/notifications.js";
import crypto from "crypto";


export const getUser = async (req,res)=>{
    try{
        const users=await User.find().select('-password')
        res.json(users)   
        console.log(users)     
    }

    catch(error){
        console.error(`server is error${error.message}`)
        res.status(500).json({ message: "Server error" })

    }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
 export const postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
      verificationToken,
      isVerified: false
    });

    // Send verification email
    const verifyLink = `http://localhost:4050/api/auth/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `<h2>Hello ${name}</h2>
       <p>Please verify your email</p>
       <a href="${verifyLink}">Verify Email</a>`
    );

    // Create notification
    await Notification.create({
      userId: newUser._id,
      message: "New user registered",
      type: "register"
    });

    res.status(201).json({
      message: "User created. Please verify your email 📧",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      userId: user._id,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set session
    req.session.userId = user._id;
    req.session.email = user.email;

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.clearCookie('connect.sid'); // clear the session cookie
    res.json({ message: "Logout successful" });
  });
};

// === password reset helpers ===
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // generate token and expiry
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      email,
      'Password Reset',
      `<p>You requested a password reset.</p>
       <p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in one hour.</p>`
    );

    res.json({ message: 'Reset link sent' });
  } catch (err) {
    console.error('Forgot password error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {
    res.status(400).json({ message: "Verification failed" });
  }
};
import bcrypt from "bcrypt";

// export const resetPassword = async (req, res) => {

//   const { email, newPassword } = req.body;

//   const user = await User.findOne({ email });

//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   user.password = hashedPassword;
//   user.resetOTP = null;
//   user.otpExpire = null;

//   await user.save();

//   res.json({ message: "Password reset successful" });
// };