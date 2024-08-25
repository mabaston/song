const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());
app.use(express.json());

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

app.use(logger);

app.use('/', express.static('./public'));

const usersRoutes = require('./routes/users-routes');
const productsRoutes = require('./routes/products-routes');

app.use('/api/auth', usersRoutes);
app.use('/api/products', productsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));