const express = require("express");

//const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
const accountRouter = require("./data/accountRouter.js");

server.use("/accounts", accountRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

module.exports = server;
