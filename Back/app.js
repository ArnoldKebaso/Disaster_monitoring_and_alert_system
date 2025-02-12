const express = require('express');
const fs = require('fs');
const path = require('path');
var logger = require('morgan');
//const cors = require('cors');
var cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/user');
const authRouter = require('./routes/auth');
const alertRouter = require('./routes/alert');
const communityController = require('./routes/community');
const highRiskController = require('./routes/high_risk');
const safeRoutesRouter = require('./routes/safeRoute');
const subscriptionRouter = require('./routes/subscription');

const locationRouter = require('./routes/location');
const resourceRouter = require('./routes/resource');
// const infrastructureRouter = require('./routes/infrastructure');
const demographicRouter = require('./routes/demographic');
const healthcareRouter = require('./routes/healthcare');
const floodRouter = require('./routes/flood');
const emailRouter = require('./routes/emailRoutes');
const logRoutes = require('./routes/logRoutes');

require('dotenv').config();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.post('/logout', (req, res) => {
  // Clear the session or token (if using sessions)
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin: 'localhost', // Your frontend domain
//   credentials: true // Allow cookies to be sent with the requests
// }));

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Dynamically import all models from the 'models' folder
fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    require(path.join(__dirname, 'models', file));
  });

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

// Define routes and controllers here...
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
// app.use('/infrastructure', infrastructureRouter);
app.use('/demographics', demographicRouter);
app.use('/healthcare', healthcareRouter);
app.use('/floods', floodRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/send', emailRouter);
app.use('/logs', logRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});








