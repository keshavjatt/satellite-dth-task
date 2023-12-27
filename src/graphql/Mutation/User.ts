import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import { userServices } from "../../services/userServices";
import { User } from "../../entities/User.entity";
import { UserType } from "../TypeDefs/User";
import { userUtils } from "../../utils/userUtils";

export const CREATE_USER = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLInt },
    active: { type: GraphQLBoolean },
  },
  async resolve(parent: any, args: User) {
    const { username, name, email, password, role, active } = args;
    try {
      const isExits = await userServices.getUserByEmail(args.email);
      if (isExits) return "user already exist";
      const hashed_password = await userUtils.hashPassword(password);
      userServices.registerUser({
        username,
        name,
        email,
        password: hashed_password,
        role,
        active,
      });
    } catch (error) {
      return "error in creating user";
    }
    return "user created succesfully";
  },
};