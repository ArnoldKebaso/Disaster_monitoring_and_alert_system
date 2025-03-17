// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Forgot Password: Validate email, generate token, store hashed token & expiry, then send reset link.
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'No user found with that email' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiry = Date.now() + 3600000; // 1 hour expiry

    await user.update({ resetPasswordToken: hashedToken, resetPasswordExpires: expiry });

    // Ensure the environment variables exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // IMPORTANT: use the FRONTEND URL (port 3001) for the reset link.
    const resetLink = `http://localhost:3001/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset Password: Verify token and expiry, then update password.
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

// Google Authentication Callback: Generate JWT token and set cookie.
const googleAuthCallback = async (req, res) => {
  try {
    // req.user is set by Passport.
    const token = jwt.sign(
      { id: req.user.user_id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
      path: '/',
    });
    res.redirect('http://localhost:3001/dashboard');
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect('/login');
  }
};

module.exports = { forgotPassword, resetPassword, googleAuthCallback };
