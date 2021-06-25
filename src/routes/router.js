const express = require("express");
import userRouter from "./user.routes";
import deckRouter from "./deck.routes";

const apiRoute = express();

// route user
apiRoute.use("/users", userRouter);
apiRoute.use("/decks", deckRouter);

export default apiRoute;