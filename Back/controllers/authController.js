// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Forgot Password: generate token, store hashed token and expiry, and send reset link via email.
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'No user found with that email' });

    // Generate token and hash it
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Set expiry to 1 hour from now
    const expiry = Date.now() + 3600000;

    await user.update({ resetPasswordToken: hashedToken, resetPasswordExpires: expiry });

    // Set up Nodemailer using a free SMTP service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,       // from .env
        pass: process.env.GMAIL_PASS,       // from .env
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}\n\nIf you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset Password: verify token and expiry then update the password.
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ where: { email, resetPasswordToken: hashedToken } });
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: 'Token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Google Authentication Callback
const googleAuthCallback = (req, res) => {
  // After successful authentication, redirect to dashboard.
  res.redirect('/dashboard');
};

module.exports = { forgotPassword, resetPassword, googleAuthCallback };
