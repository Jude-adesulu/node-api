const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./common/config/swagger-config');
const {NODE_ENV} = require('./common/config');
const notFound = require('./common/middlewares/NotFound');
const errHandler = require('./common/middlewares/ServerErr');

// Routers
const baseRouter = require('./api/routes');
const userRoutes = require('./api/routes/user.routes');
const transacRoute = require('./api/routes/transac.routes');

// create express app
const app = express();

const options = {
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/docs/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// logging
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('tiny'));
  }

// Routes
app.use('/', baseRouter);
app.use('/api', userRoutes);
app.use('/api', transacRoute);

  
  // error handler
app.use(errHandler);

// error handler for 404
app.use(notFound);

module.exports = app;
