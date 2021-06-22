const express = require("express");
import userRouter from "./user.routes";

const apiRoute = express();

// route user
apiRoute.use("/users", userRouter);

export default apiRoute;