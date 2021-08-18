// server.js
var express = require('express');
var graphqlHTTP = require('express-graphql');
// var graphql = require('graphql');
var bodyParser = require('body-parser');
var cors = require('cors');
// const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
var app = express();
var PORT = process.env.port || 3001;

var corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions), bodyParser.json());

var UserSchema = require('./api/schema/UserSchema');
var AuthSchema = require('./api/schema/AuthSchema');

app.use(
  '/users',
  graphqlHTTP({
    schema: UserSchema,
    graphiql: true,
  })
);

app.use(
  '/auth',
  graphqlHTTP({
    schema: AuthSchema,
    graphiql: true,
  })
);

app.listen(PORT);
console.log('Server running on localhost:', PORT);