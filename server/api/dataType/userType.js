var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLInputObjectType = graphql.GraphQLInputObjectType;
var GraphQLString = graphql.GraphQLString;
// var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
// var GraphQLFloat = graphql.GraphQLFloat;

var Type = new GraphQLObjectType({
  name: "usersType",
  description: "Detail of The users",
  fields: () => ({
    users_id: {
      type: GraphQLInt,
      description: "id of the users",
    },
    users_name: {
      type: GraphQLString,
      description: "name of the users",
    },
    users_address: {
      type: GraphQLString,
      description: "address of users",
    },
    users_city: {
      type: GraphQLString,
      description: "city of users",
    },
    users_region: {
      type: GraphQLString,
      description: "region of users",
    },
    users_tel: {
      type: GraphQLString,
      description: "tel of users",
    },
    users_email: {
      type: GraphQLString,
      description: "email of users",
    },
    job_position: {
      type: GraphQLString,
      description: "job_position of users",
    },
    branch_id: {
      type: GraphQLInt,
      description: "branch_id of users",
    },
    branch_name: {
      type: GraphQLString,
      description: "branch_id of users",
    },
    username: {
      type: GraphQLString,
      description: "username of users",
    },
    password: {
      type: GraphQLString,
      description: "password of users",
    },
    usergroup_id: {
      type: GraphQLInt,
      description: "password of users",
    },
    usergroup_name: {
      type: GraphQLString,
      description: "password of users",
    },
  })
});

var inputType = new GraphQLInputObjectType({
  name: "usersInput",
  description: "Detail of The users",
  fields: () => ({
    users_id: {
      type: GraphQLInt,
      description: "id of the users",
    },
    users_name: {
      type: GraphQLString,
      description: "name of the users",
    },
    users_address: {
      type: GraphQLString,
      description: "address of users",
    },
    users_city: {
      type: GraphQLString,
      description: "city of users",
    },
    users_region: {
      type: GraphQLString,
      description: "region of users",
    },
    users_tel: {
      type: GraphQLString,
      description: "tel of users",
    },
    users_email: {
      type: GraphQLString,
      description: "email of users",
    },
    job_position: {
      type: GraphQLString,
      description: "job_position of users",
    },
    branch_id: {
      type: GraphQLInt,
      description: "branch_id of users",
    },
    branch_name: {
      type: GraphQLString,
      description: "branch_id of users",
    },
    username: {
      type: GraphQLString,
      description: "username of users",
    },
    password: {
      type: GraphQLString,
      description: "password of users",
    },
    usergroup_id: {
      type: GraphQLInt,
      description: "password of users",
    },
    usergroup_name: {
      type: GraphQLString,
      description: "password of users",
    },
  })
});

//--------------------------------------
module.exports = {
  userType: Type,
  inputType: inputType
}