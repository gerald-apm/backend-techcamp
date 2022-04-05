const express = require("express");
const router = express.Router();
const mongo = require("mongojs");
const db = mongo("mongodb://34.101.57.136:27017/csr?directConnection=true", [
  "todos",
]);

router.get("/", (req, res, next) => {
  let query = {};
  if (req.query.text) query.text = req.query.text;
  if (req.query.isCompleted) {
    if (req.query.isCompleted === "true") query.isCompleted = true;
    elsequery.isCompleted = false;
  }

  db.todos.find(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res, next) => {
  let todo = req.body;
  todo._id = db.ObjectId();

  if (!todo.text || !(todo.isCompleted + "")) {
    res.status(400);
    res.json({ error: "Invalid Data" });
  } else {
    db.todos.save(todo, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

router.put("/:id", (req, res, next) => {
  let todo = req.body;

  if (!todo.text || !(todo.isCompleted + "")) {
    res.status(400);
    res.json({ error: "Invalid Data" });
  } else {
    db.todos.replaceOne(
      { _id: db.ObjectId(req.params.id) },
      {
        text: todo.text,
        isCompleted: todo.isCompleted,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
    );
  }
});

router.get("/:id", (req, res, next) => {
  let query = { _id: db.ObjectId(req.params.id) };

  db.todos.findOne(query, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  let query = { _id: db.ObjectId(req.params.id) };

  db.todos.remove(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
