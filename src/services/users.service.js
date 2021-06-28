const UserModel = require("../models/user.model");
const DeckModel = require("../models/deck.model");

const { JWT_SECRET } = require('../configs/index')
const JWT = require('jsonwebtoken')

const encodedToken = (userId) => {
  return JWT.sign({
    iss: 'Van Hoang',
    sub: userId,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3),
  }, JWT_SECRET)
}

const getAllUsers = async () => {
  return await UserModel.find({});
};

const addNewUser = async (req) => {
  return new UserModel(req.value.body)
};

const getUserID = async (req) => {
  // req.value.params is a Object, so use {}
  const {userId} = req.value.params
  return await UserModel.findById(userId) 
};

const replaceUserID = async (req) => {
  // req.value.params is a Object, so use {}
  const {userId} = req.value.params

  const newUser = req.value.body

  return await UserModel.findByIdAndUpdate(userId, newUser)
};

const updateUserID = async (req) => {
  // req.value.params is a Object, so use {}
  const {userId} = req.value.params

  const newUser = req.value.body

  return await UserModel.findByIdAndUpdate(userId, newUser)
};

const getUserDeck = async (req) => {
  // req.value.params is a Object, so use {}
  const {userId} = req.value.params

  return await UserModel.findById(userId).populate('decks')
};

const addNewDeck = async (req) => {
  // req.value.params is a Object, so use {}
  const {userId} = req.value.params

  //create a Deck
  const newDeck = new DeckModel(req.value.body)

  //get user
  const user = await UserModel.findById(userId)

  // Assign user as a deck's owner
  newDeck.owner = user

  console.log(user)

  // Save the deck
  await newDeck.save()

  // Add deck to user's decks array 'decks'
  user.decks.push(newDeck._id)

  // Save the user
  await user.save()
  
  return await newDeck
};

const signup = async (req, res) => {
  // req.value.params is a Object, so use {}
  const {firstName, lastName, email, password} = req.value.body

  const foundEmail = await UserModel.findOne({email})
  if(foundEmail) return res.status(403).json({error: {message: "Email is already in use."}})

  // create a User
  const newUser = new UserModel({firstName, lastName, email, password})
  newUser.save()

  // encode Token
  return await encodedToken(newUser._id);
};

const signin = async (req, res) => {
  // encode Token
  return await encodedToken(req.user._id);
};

module.exports = {
  getAllUsers,
  addNewUser,
  getUserID,
  replaceUserID,
  updateUserID,
  addNewDeck,
  getUserDeck,
  signup, 
  signin
}
