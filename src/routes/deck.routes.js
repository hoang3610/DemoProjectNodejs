const express = require("express");
import DeckController from "../controllers/deck.controller.js";

// const router = express.Router();
const router = require("express-promise-router")();

// validateParams
import { validateParam, validateBody, schemas } from "../helpers/routerHelpers"

router.route('/')
    .get(DeckController.index)
    .post(validateBody(schemas.newDeckSchema), DeckController.newDeck) 
;
router.route('/:deckId')
    .get(validateParam(schemas.idSchema, 'deckId'), DeckController.getDeck)
    .put(validateParam(schemas.idSchema, 'deckId'), validateBody(schemas.newDeckSchema), DeckController.replaceDeck)
    .patch(validateParam(schemas.idSchema, 'deckId'), validateBody(schemas.deckOptionalSchema), DeckController.updateDeck)
    .delete(validateParam(schemas.idSchema, 'deckId'), DeckController.deleteDeck)
;

export default router;