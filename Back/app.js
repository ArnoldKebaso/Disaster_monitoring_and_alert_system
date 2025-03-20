// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const session = require('express-session');
// const logger = require('morgan');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const cookieParser = require('cookie-parser');
// const sequelize = require('./config/database');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swagger');
// const authMiddleware = require('./middleware/auth');
// require('dotenv').config();
// const bcrypt = require('bcrypt');

// const app = express();
// const passport = require('./config/passport');

// // Set up session store
// const store = new SequelizeStore({ db: sequelize });

// app.use(session({
//   secret: process.env.JWT_SECRET || 'your-secret-key', // set this in your .env file
//   resave: false,
//   saveUninitialized: false,
//   store: store, // Connect the session store
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// // Initialize passport after session middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Import routes
// const userRoutes = require('./routes/user');
// const authRouter = require('./routes/auth');
// const alertRouter = require('./routes/alert');
// const communityController = require('./routes/community');
// const highRiskController = require('./routes/high_risk');
// const safeRoutesRouter = require('./routes/safeRoute');
// const subscriptionRouter = require('./routes/subscription');
// const locationRouter = require('./routes/location');
// const resourceRouter = require('./routes/resource');
// const demographicRouter = require('./routes/demographic');
// const healthcareRouter = require('./routes/healthcare');
// const floodRouter = require('./routes/flood');
// const emailRouter = require('./routes/emailRoutes');
// const logRoutes = require('./routes/logRoutes');
// const smsRoutes = require('./routes/smsRoutes');
// const adminCommunityReportsRoutes = require('./routes/adminCommunityReports');
// const cors = require('cors');

// app.use(express.json());
// app.use(cookieParser());

// store.sync(); // Sync the session store

// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true
// }));

// app.post('/logout', (req, res) => {
//   res.clearCookie('token'); // Clear the token cookie
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));

// // Ensure the uploads directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// // Dynamically import all models from the 'models' folder
// fs.readdirSync(path.join(__dirname, 'models'))
//   .filter((file) => file.endsWith('.js'))
//   .forEach((file) => {
//     require(path.join(__dirname, 'models', file));
//   });

// // Sync database
// sequelize.sync({ force: false }).then(() => {
//   console.log('Database & tables created!');
// });

// // Define routes and controllers
// app.use('/user', authMiddleware, userRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use('/register', authRouter);
// app.use('/', authRouter);
// app.use('/alerts', alertRouter);
// app.use('/community-reports', communityController);
// app.use('/high-risk-areas', highRiskController);
// app.use('/safe-routes', safeRoutesRouter);
// app.use('/locations', locationRouter);
// app.use('/resources', resourceRouter);
// app.use('/demographics', demographicRouter);
// app.use('/healthcare', healthcareRouter);
// app.use('/floods', floodRouter);
// app.use('/subscriptions', subscriptionRouter);
// app.use('/send', emailRouter);
// app.use('/logs', logRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', smsRoutes);
// app.use('/admin/community-reports', authMiddleware, adminCommunityReportsRoutes);
// app.use('/profile-photos', express.static(path.join(__dirname, 'uploads/profile-photos')));

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();
const bcrypt = require('bcrypt');
const passport = require('./config/passport');

const app = express();

// Import routes
const userRoutes = require('./routes/user');
const authRouter = require('./routes/auth');
const alertRouter = require('./routes/alert');
const communityController = require('./routes/community');
const highRiskController = require('./routes/high_risk');
const safeRoutesRouter = require('./routes/safeRoute');
const subscriptionRouter = require('./routes/subscription');
const locationRouter = require('./routes/location');
const resourceRouter = require('./routes/resource');
const demographicRouter = require('./routes/demographic');
const healthcareRouter = require('./routes/healthcare');
const floodRouter = require('./routes/flood');
const emailRouter = require('./routes/emailRoutes');
const logRoutes = require('./routes/logRoutes');
const smsRoutes = require('./routes/smsRoutes');
const adminCommunityReportsRoutes = require('./routes/adminCommunityReports');

const cors = require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const store = new SequelizeStore({ db: sequelize });
store.sync();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    require(path.join(__dirname, 'models', file));
  });

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/user', authMiddleware, userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/register', authRouter);
app.use('/', authRouter);
app.use('/alerts', alertRouter);
app.use('/community-reports', communityController);
app.use('/high-risk-areas', highRiskController);
app.use('/safe-routes', safeRoutesRouter);
app.use('/locations', locationRouter);
app.use('/resources', resourceRouter);
app.use('/demographics', demographicRouter);
app.use('/healthcare', healthcareRouter);
app.use('/floods', floodRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/send', emailRouter);
app.use('/logs', logRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', smsRoutes);
app.use('/admin/community-reports', authMiddleware, adminCommunityReportsRoutes);
app.use('/profile-photos', express.static(path.join(__dirname, 'uploads/profile-photos')));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
