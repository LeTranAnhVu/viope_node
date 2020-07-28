const db = require('./config');

// fetch all
const fetchAll = (req, res) => {
  db.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'there are some errors'});
    } else {
      res.json(result.rows);
    }
  });

};

// fetch by id
const fetchById = (req, res) => {
  db.query(`SELECT * FROM customers WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'there are some errors'});
    } else {
      if (result.rows[0]) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({'message': 'NOT FOUND'});
      }
    }
  });
};

// create by id
const addNew = (req, res) => {
  const {firstname, lastname, email, phone} = req.body;
  const query = {
    text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
    values: [firstname, lastname, email, phone]
  };
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'there are some errors'});
    } else {
      let newCustomer = {firstname, lastname, email, phone};
      res.status(200).json(newCustomer);
    }
  });
};

// delete by id
const deleteById = (req, res) => {
  db.query(`DELETE FROM customers WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'there are some errors'});
    } else {
      if (result.rowCount) {
        res.status(204).json({'message': 'delete success'});
      } else {
        res.status(404).json({'message': 'NOT FOUND'});
      }
    }
  });
};

// put by id
const updateById = (req, res) => {
  const {firstname, lastname, email, phone} = req.body;
  const query = {
    text: 'UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5',
    values: [firstname, lastname, email, phone, req.params.id]
  };
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'there are some errors'});
    } else {
      if (result.rowCount) {
        let updatedCustomer = {firstname, lastname, email, phone};
        res.status(200).json(updatedCustomer);
      } else {
        res.status(404).json({'message': 'NOT FOUND'});
      }
    }
  });
};

// Delete all
const deleteAll = () => {
  db.query('DELETE FROM customers', (err, res) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
  })
}

module.exports = {
  fetchAll,
  addNew,
  fetchById,
  deleteById,
  updateById,
  deleteAll
};
