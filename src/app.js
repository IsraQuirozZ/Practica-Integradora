import express from "express";
import "dotenv/config.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const server = express();

// middlewares
server.use("/public", express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// endpoints
// server.use("/", router);
server.use(errorHandler);
server.use(notFoundHandler);

export default server;
