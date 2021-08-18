var graphql = require('graphql');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLNonNull = graphql.GraphQLList;
// var GraphQLInt = graphql.GraphQLInt;
// var GraphQLFloat = graphql.GraphQLFloat;
var GraphQLBoolean = graphql.GraphQLBoolean;
var models = require('../model/authModel');

// import {
//   GraphQLString,
//   GraphQLInputObjectType,
//   GraphQLNonNull,
// } from 'graphql';

var {
  userType,
  inputType
} = require('../dataType/userType');

var authType = new GraphQLObjectType({
  name: "authType",
  description: "authType",
  fields: () => ({
    accessToken: {
      type: GraphQLString,
      description: "accessToken of login",
    },
    isToken: {
      type: GraphQLBoolean,
      description: "isToken of login",
    },
    isRegister: {
      type: GraphQLBoolean,
      description: "isRegister of register",
    },
    isUsername: {
      type: GraphQLBoolean,
      description: "isUsername of checkUsername",
    },
    userData: {
      type: new GraphQLList(userType),
      description: "userData of login",
    }
  })
});

var doLogin = {
  type: new GraphQLList(authType),
  args: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  },
  resolve: function (_, args) {
    var data = {
      username: args.username,
      password: args.password
    };
    return models.login(data);
  }
};

var cheackUsername = {
  type: new GraphQLList(authType),
  args: {
    username: {
      type: GraphQLString
    }
  },
  resolve: function (_, args) {
    var data = {
      username: args.username,
    };
    return models.chechUsername(data);
  }
};

var checkLogin = {
  type: new GraphQLList(authType),
  resolve: function (_, args, context) {
    if (context.headers.authorization) {
      var data = {
        authorization: context.headers.authorization
      };
      return models.checkLogin(data);
    } else {
      return [];
    }
  }
};

var doRegister = {
  type: new GraphQLList(authType),
  args: {
    userData: {
      type: new GraphQLNonNull(inputType)
    },
  },
  resolve: async function (_, args) {
    var data = args.userData[0];
    var isUsername = await models.checkUsername(data);
    if (isUsername) {
      return models.save(data);
    } else {
      return [{
        isRegister: false,
        isUsername: true
      }];
    }

  }
};

var queryType = new GraphQLObjectType({
  name: "queryLogin",
  description: "query of Login",
  fields: () => ({
    doLogin: doLogin,
    checkLogin: checkLogin,
    cheackUsername: cheackUsername
  })
});

var mutationType = new GraphQLObjectType({
  name: "mutationUsers",
  description: "mutation of Login",
  fields: () => ({
    doRegister: doRegister,
  })
});
//------------------------------------------------
var AuthSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = AuthSchema