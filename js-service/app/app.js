var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

app.use(cors());

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/', function (req, res) {
  res.json({message: 'Home Page. It works!'});
});

app.get('/user/profile', keycloak.protect('realm:user'), function (req, res) {
  res.json({message: 'User role - Access allowed!'});
});

app.get('/user/admin', keycloak.protect('realm:admin'), function (req, res) {
  res.json({message: 'Admin role - Access allowed!'});
});

app.use('*', function (req, res) {
  res.send('Not found!');
});

app.listen(3000, function () {
  console.log('Application started at port 3000');
});