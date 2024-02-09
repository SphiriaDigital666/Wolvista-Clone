import { User } from './user.mongo';

export const getUsers = () => User.find();

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ 'authentication.sessionToken': sessionToken });

export const getUserById = (id: string) => User.findById({ _id: id });

export const getUserByRefreshToken = (refreshToken: string) =>
  User.findOne({ refreshToken: { $in: [refreshToken] } });

export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  User.findByIdAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
