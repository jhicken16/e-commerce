const express = require('express');

const { PORT } = require('./config');
const db = require('./db/index')
 
const app = express();

//This was to test that database was set up correctly.
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});