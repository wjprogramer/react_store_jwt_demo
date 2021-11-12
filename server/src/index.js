const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();

const jwtSecret = 'secret123';
const csrfProtection = csrf({
  cookie: true
});

app.use(cors());
app.use(cookieParser());
app.use(csrfProtection);

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

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];

app.get('/foods', (req, res) => {
  res.json(foods);
});

app.post('/foods', (req, res) => {
  foods.push({
    id: foods.length + 1,
    description: 'new food'
  });
  res.json({
    message: 'Food created!'
  });
});

app.listen(3001);
console.log('App running on localhost:3001');
