const express = require("express");
const router = express.Router();
//onst accounts = require("./seeds/accounts.js");
const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db("accounts")
    .select("*")
    .then(acct => {
      res.status(200).json(acct);
    })
    .catch(err => {
      res.status(500).json({ err: "problem with the database" });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  db("accounts")
    .insert(body)
    .then(acct => {
      res.status(201).json(body);
    })
    .catch(err => {
      res.status(500).json({ err: "problem with the database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("accounts")
    .where({ id })
    .then(account => {
      if (account[0]) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "db problem" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "db problem" });
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db
      .del()
      .from("accounts")
      .where({ id });
    count
      ? res.status(200).json({ deleted: count })
      : res.status(404).json({ message: "invalid id" });
  } catch (err) {
    res.status(500).json({ message: "database error", error: err });
  }
});

module.exports = router;
