module.exports = (sequelize, Sequelize) => {
  const Sentence = sequelize.define("sentence", {
    original: {
      type: Sequelize.STRING
    },
    translated: {
      type: Sequelize.STRING
    }
  });

  return Sentence;
};