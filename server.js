const express = require('express');
const loaders = require('./loaders')
const { PORT } = require('./config');

const app = express();

loaders(app)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});