const DeckService = require("../services/decks.service.js");
const DeckController = {};

DeckController.index = async (req, res, next) => {
  // async/await way
  const decks = await DeckService.getAllDecks();
  return res.status(200).json({ decks });
};

DeckController.newDeck = async (req, res, next) => {
  // async/await way
  const newDeck = await DeckService.addNewDeck(req);

  return res.status(201).json({ deck: newDeck });
};

DeckController.getDeck = async (req, res, next) => {
  // async/await way
  const deck = await DeckService.getDeckId(req);
  
  return res.status(201).json({ deck: deck });
};

DeckController.replaceDeck = async (req, res, next) => {
  // async/await way
  await DeckService.replaceDeckId(req);

  return res.status(201).json({ success: true});
};

DeckController.updateDeck = async (req, res, next) => {
  // async/await way
  await DeckService.updateDeckId(req);

  return res.status(201).json({ success: true});
};

DeckController.deleteDeck = async (req, res, next) => {
  // async/await way
  await DeckService.deleteDeckId(req);

  return res.status(201).json({ success: true});
}; 

export default DeckController;
