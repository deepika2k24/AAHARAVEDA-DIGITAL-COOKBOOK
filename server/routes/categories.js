const express = require("express");

const Router = express.Router();

const mysqlConnect = require("../data_base.js");

Router.route("/")
  .get((req, res) => {
    mysqlConnect.query("SELECT * from categories", (err, row, field) => {
      if (!err) {
        res.status(200).send(row);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res, next) => {
    const category = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      createdAt: req.body.createdAt,
    };
    mysqlConnect.query(
      "INSERT INTO categories SET?",
      category,
      (err, results) => {
        if (!err) {
          res.status(201).send(`category added with ID:${results.insertId}`);
        } else {
          console.log(err);
        }
      }
    );
  });

Router.route("/:categoryName")
  .put((req, res) => {
    const categoryName = req.params.categoryName
    const category = {
      categoryDescription: req.body.categoryDescription,
    };
    mysqlConnect.query(
      "UPDATE categories SET ? WHERE categoryName = ?",
      [category, categoryName],
      (err, results) => {
        if (!err) {
          res.send(`Recipe update with name: ${categoryName}`);
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete((req, res) => {
    const id = req.params.categoryName;
    mysqlConnect.query(
      "DELETE FROM categories WHERE categoryName = ?",
      id,
      (err, results) => {
        if (!err) {
          res.send(`category deleted with ID: ${id}`);
        } else {
          res.send(err);
        }
      }
    );
  });

module.exports = Router;
