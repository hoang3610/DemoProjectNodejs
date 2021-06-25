const UserModel = require("../models/user.model");
const DeckModel = require("../models/deck.model");

const getAllDecks = async () => {
  return await DeckModel.find({});
};

const addNewDeck = async (req) => {
    const owner = await UserModel.findById(req.value.body.owner)

    // Create a new deck
    const deck = req.value.body
    delete deck.owner 
  
    deck.owner = owner._id
    const newDeck = new DeckModel(deck)
    console.log(newDeck)
    await newDeck.save()
  
    // add newly created deck to the actual decks
    owner.decks.push(newDeck._id)
    await owner.save()
    
    return await newDeck
};

const getDeckId = async (req) => {
    const { deckId } = req.params

    return await DeckModel.findById(deckId);
};

const replaceDeckId = async (req) => {
    // replace all new deck to old user
  const { deckId } = req.value.params

  const newDeck = req.value.body

  return await DeckModel.findByIdAndUpdate(deckId, newDeck)
};

const updateDeckId = async (req) => {
    // replace all new deck to old user
  const { deckId } = req.value.params

  const newDeck = req.value.body

  return await DeckModel.findByIdAndUpdate(deckId, newDeck)
};

const deleteDeckId = async (req) => {
    const { deckId } = req.value.params

    //get a deck
    const deck = await DeckModel.findById(deckId)
    const ownerId = deck.owner
  
    const owner = await UserModel.findById(ownerId)
  
    await deck.remove()
  
    // delete phan tu deck trong array
    owner.decks.pull(deck)
    await owner.save()
};

module.exports = {
  getAllDecks,
  addNewDeck,
  getDeckId,
  replaceDeckId,
  updateDeckId,
  deleteDeckId
}
