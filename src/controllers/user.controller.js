import { set } from "mongoose";
import { token } from "morgan";

const UserService = require("../services/users.service.js");
const UserController = {};

UserController.index = async (req, res, next) => {
  // async/await way
  const users = await UserService.getAllUsers();
  return res.status(200).json({ users });
};

UserController.newUser = async (req, res, next) => {
  // async/await way
  const newUser = await UserService.addNewUser(req);

  await newUser.save();
  return res.status(201).json({ user: newUser });
}; 

UserController.getUser = async (req, res, next) => {
  // async/await way
  const user = await UserService.getUserID(req);

  return res.status(201).json({ user });
};

UserController.replaceUser = async (req, res, next) => {
  // async/await way
  await UserService.replaceUserID(req);

  return res.status(200).json({success: true})
};

UserController.updateUser = async (req, res, next) => {
  // async/await way
  await UserService.updateUserID(req);

  return res.status(200).json({success: true})
};

UserController.getUserDeck = async (req, res, next) => {
  // async/await way
  const user = await UserService.getUserDeck(req);

  console.log(user)
  return res.status(200).json({deck: user.decks})
};

UserController.newUserDeck = async (req, res, next) => {
  // async/await way
  const newDeck = await UserService.addNewDeck(req);
  return res.status(201).json({deck: newDeck})
};

UserController.signup = async (req, res, next) => {
  // async/await way
  const token = await UserService.signup(req, res)
  console.log(token)
  res.setHeader('Authorization', token)
  return res.status(201).json({success: true})
};

UserController.signin = async (req, res, next) => {
  // async/await way
  console.log("dang nhap thanh cong")
  //Assign a token
  const token = await UserService.signin(req, res)
  res.setHeader('Authorization', token)
  return res.status(201).json({success: true})
};

UserController.secret = async (req, res, next) => {
  return res.status(200).json({resource: true})  
};

export default UserController;
