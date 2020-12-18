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

app.listen(3333, () => {
    console.log(`Server is running on port 3333`);
});