var graphql = require('graphql');
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
// var GraphQLFloat = graphql.GraphQLFloat;
// var GraphQLObjectType = graphql.GraphQLObjectType;
// var GraphQLString = graphql.GraphQLString;

var models = require('../model/userModel');
var {
  userType
} = require('../dataType/userType');

var getUsers = {
  type: new GraphQLList(userType),
  resolve: function (_, args) {
    return models.get();
  }
}

var getUserById = {
  type: new GraphQLList(userType),
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve: function (_, args) {
    var data = {
      id: args.id
    }
    return models.getById(data);
  }
}

//----------------------------------------------
module.exports = {
  getUsers: getUsers, // ไม่จำเป็นที่ชื่อต้องซ้ำกัน
  getUserById: getUserById,

}