module.exports = app => {
  const sentences = require("../controllers/sentence.controller.js");

  var router = require("express").Router();

  // Create a new Sentence
  router.post("/", sentences.create);

  // Retrieve all Sentences
  router.get("/", sentences.findAll);

  app.use('/api/sentences', router);
};