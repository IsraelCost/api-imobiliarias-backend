require('dotenv').config('../.env');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require('./database');

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

const { notFound, catchAll } = require('./middlewares/Global');

app.use(notFound);
app.use(catchAll);

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log(`Server is running on port: ${port}`);
});