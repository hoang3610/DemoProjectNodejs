const express = require("express");
import UserController from "../controllers/user.controller.js";

// const router = express.Router();
const router = require("express-promise-router")();

// validateParams
import { validateParam, validateBody, schemas } from "../helpers/routerHelpers"

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser) 
;
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'),UserController.getUser)
    .put(validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema),UserController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema),UserController.updateUser)
;
router.route('/:userId/decks')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUserDeck)
    .post(validateParam(schemas.idSchema, 'userId'), validateBody(schemas.deckSchema),UserController.newUserDeck)
    // .put(UserController.replaceUser)
    // .patch(UserController.updateUser)
;

export default router;