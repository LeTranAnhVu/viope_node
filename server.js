// file structure
// server.js <--- this file
// db/
//   config.js
//   customer.js
// node_modules
// package.json

const express = require('express');

const queryCustomer = require('./db/customer');
const auth = require('./services/authenticate');

const app = express();
app.use(express.json());

process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";


const port = process.env.PORT || 3000;

// protect all customer apis
app.use('/api/customers', auth.authenticate)

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

// Route for login
app.post("/login", auth.login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app
