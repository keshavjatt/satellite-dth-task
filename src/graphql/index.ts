import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as userQueries from "./Queries/User";
import * as userMutations from "./Mutation/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: userQueries.GET_SINGLE_USER,
    getAllUser: userQueries.GET_ALL_USER,
    getSubscription: userQueries.USER_SUBSCRIPTION,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: userMutations.CREATE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});