const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(cookieParser());

const jwtSecret = 'secret123';

app.get('/jwt', (req, res) => {
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);

  res.cookie('token', token, { httpOnly: true });

  res.json({
    token: jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret)
  });  
});

app.use(
  jwt({
    secret: jwtSecret,
    getToken: req => req.cookies.token,
    algorithms: ['HS256'],
  })
);

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];

app.get('/foods', (req, res) => {
  res.json(foods);
});

app.listen(3001);
console.log('App running on localhost:3001');
