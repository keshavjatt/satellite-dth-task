import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt,
  } from "graphql";

  import { SubscribeType } from "./Subscription";
  
  export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      role: { type: GraphQLInt },
      active :{type: GraphQLBoolean}
    }),
  });