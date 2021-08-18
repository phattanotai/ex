var graphql = require('graphql');
// var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var GraphQLFloat = graphql.GraphQLFloat;

var models = require('../model/userModel');
var {
  userType
} = require('../dataType/userType');

var addUser = {
  type: new GraphQLList(userType),
  args: {
    name: {
      type: GraphQLString
    },
    lat: {
      type: GraphQLFloat
    },
    lng: {
      type: GraphQLFloat
    }
  },
  resolve: function (_, args) {
    console.log(args)
    var data = {
      name: args.name,
      lat: args.lat,
      lng: args.lng
    }
    models.save(data);
    return models.getByName(data);
  }
}
var updateUser = {
  type: new GraphQLList(userType),
  args: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    lat: {
      type: GraphQLFloat
    },
    lng: {
      type: GraphQLFloat
    }
  },
  resolve: function (_, args) {
    var data = {
      id: args.id,
      name: args.name,
      lat: args.lat,
      lng: args.lng
    }
    models.update(data);
    return models.getById(data);
  }
}
var deleteUser = {
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
    models.delete(data)
    return models.get();
  }
}

//----------------------------------------------------
module.exports = {
  addUser: addUser, // ไม่จำเป็นที่ชื่อต้องซ้ำกัน
  updateUser: updateUser,
  deleteUser: deleteUser,
}