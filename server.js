// file structure
// server.js <--- this file
// db/
//   config.js
//   customer.js
// node_modules
// package.json

const express = require('express');
const db = require('./db/config');

const queryCustomer = require('./db/customer');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


// fetch all
app.get('/api/customers', queryCustomer.fetchAll);

// fetch by id
app.get('/api/customers/:id', queryCustomer.fetchById);

// create by id
app.post('/api/customers', queryCustomer.addNew);

// delete by id
app.delete('/api/customers/:id', queryCustomer.deleteById);

// put by id
app.put('/api/customers/:id', queryCustomer.updateById);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app
