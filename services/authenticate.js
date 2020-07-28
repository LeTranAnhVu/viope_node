const jwt = require('jsonwebtoken');
const user = require('../db/user');
const bcrypt = require('bcrypt');


const login = (req, res) => {
  const {email, password} = req.body;

  const loginedUser = user.getUserByEmail(email, (user) => {
    if (user.length > 0) {
      const hashpwd = user[0].password;
      const token = jwt.sign({userId: email}, process.env.SECRET_KEY);

      if (bcrypt.compareSync(password, hashpwd))
        return res.send({token});
      else
        return res.sendStatus(401).end();
    }
    else {
      return res.sendStatus(401).end();
    }
  });
}

// User authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) {
    return res.sendStatus(401).end();
  }

  // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.sendStatus(400).end();
    else
      return next();
  });
}

module.exports = {
  authenticate: authenticate,
  login: login
}