var graphql = require('graphql');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
// var GraphQLString = graphql.GraphQLString;
// var GraphQLList = graphql.GraphQLList;
// var GraphQLInt = graphql.GraphQLInt;
// var GraphQLFloat = graphql.GraphQLFloat;

var {
  getUsers,
  getUserById
} = require('../queryType/userQuery');
var {
  addUser,
  updateUser,
  deleteUser
} = require('../mutationType/userMutation');

var queryType = new GraphQLObjectType({
  name: "queryUser",
  description: "query of user",
  fields: () => ({
    getUsers: getUsers,
    getUserById: getUserById
  })
});

var mutationType = new GraphQLObjectType({
  name: "mutationUsers",
  description: "mutation of Users",
  fields: () => ({
    addEmployee: addUser,
    updateEmployee: updateUser,
    deleteEmployee: deleteUser
  })
});


//------------------------------------------------
var UserSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
module.exports = UserSchema;