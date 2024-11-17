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

const app = express();
const userRoutes = require('./routes/user');
const authRouter = require('./routes/auth');
const alertRouter = require('./routes/alert');
const communityController = require('./routes/community');
const highRiskController = require('./routes/high_risk');
const safeRoutesRouter = require('./routes/safeRoute');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});









// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3001' })); // adjust if frontend runs on a different port



// const express = require('express');
// const cors = require('cors');


// app.use(cors({ origin: 'http://localhost:3001' }));


// const alertsRoutes = require('./routes/alert');
// app.use('/api/alerts', alertsRoutes);

// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// var logger = require('morgan');
// const cors = require('cors');
// var cookieParser = require('cookie-parser');
// const sequelize = require('./config/database');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swagger');
// const authMiddleware = require('./middleware/auth');

// const app = express();
// const userRoutes = require('./routes/user');
// const authRouter = require('./routes/auth');
// const alertRouter = require('./routes/alert');
// const communityController = require('./routes/community');
// const highRiskController = require('./routes/high_risk');
// const safeRoutesRouter = require('./routes/safeRoute');

// app.use(express.json());
// app.use(cookieParser());
// app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin: '*', // Your frontend domain
//   credentials: true // Allow cookies to be sent with the requests
// }));

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

// // Define routes and controllers here...
// app.use('/users', authMiddleware, userRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use('/auth', authRouter);
// app.use('/alerts', alertRouter);
// app.use('/', communityController);
// app.use('/', highRiskController);
// app.use('/', safeRoutesRouter);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
