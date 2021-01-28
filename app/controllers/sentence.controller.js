const db = require("../models");
const thesaurus = require("thesaurus");
const Sentence = db.sentences;
const Op = db.Sequelize.Op;

// Finds longest synonym for given word using thesaurus
function longest_synonym(word) {
  const syns = thesaurus.find(word);
  if (syns.length == 0) { return word; }
  // console.log(syns);

  return syns.sort(function(a, b) {
    return b.length - a.length
  })[0];
}

function translate(original) {
  // TODO: on FE, don't allow for submitting blank
  if (!original) { return ''; }

  const words = original.split(/([_\W])/);
  const syns = words.map((word) => longest_synonym(word));

  return syns.join('');
}

// Create and Save a new Sentence
const create = async (req, res) => {
  // Find longest synonym
  const original = req.body.original;

  // Find if translated already
  const existing = await Sentence.findAll({
    where: {
      original: { [Op.like]: original }
    }
  });
  console.log(existing);

  if (existing.length > 0) {
    res.send(existing[0]);
    return;
  }

  const translated = translate(original);

  const sentence = {
    original: original,
    translated: translated
  };

  // Save Sentence in the database
  Sentence.create(sentence)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the Sentence."
      });
    });
};

module.exports.create = create;

// Retrieve all Sentences from the database.
exports.findAll = (req, res) => {
  console.log("Finding all");
  Sentence.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all sentences."
      });
    });
};
