module.exports = (sequelize, Sequelize) => {
  const Word = sequelize.define("word", {
    original: {
      type: Sequelize.STRING
    },
    synonym: {
      type: Sequelize.STRING
    }
  });

  return Word;
};