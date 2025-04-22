// Import necessary libraries and modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Forgot Password: Validate email, generate token, store hashed token & expiry, then send reset link.
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'No user found with that email' });

    // Generate a reset token and hash it
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiry = Date.now() + 3600000; // Token expires in 1 hour

    // Update user with the hashed token and expiry
    await user.update({ resetPasswordToken: hashedToken, resetPasswordExpires: expiry });

    // Ensure email service credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Generate the reset link using the frontend URL
    const resetLink = `http://localhost:3001/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
    };

    // Send the reset email
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
    const { email, token, newPassword } = req.body; // Extract email, token, and new password from request body

    // Hash the token for comparison
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by email and hashed token
    const user = await User.findOne({ where: { email, resetPasswordToken: hashedToken } });

    // Check if token is valid and not expired
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: 'Token is invalid or has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token and expiry
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
    // req.user is set by Passport.js after successful Google authentication
    const token = jwt.sign(
      { id: req.user.user_id, role: req.user.role }, // Payload with user ID and role
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: '1h' } // Token expiration time
    );

    // Set the JWT token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent cross-site request forgery
      maxAge: 3600000, // Cookie expiration time (1 hour)
      path: '/', // Cookie is accessible on all paths
    });

    // Redirect the user to the dashboard
    res.redirect('http://localhost:3001/dashboard');
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect('/login'); // Redirect to login page on error
  }
};

// Export all controller functions
module.exports = { forgotPassword, resetPassword, googleAuthCallback };
