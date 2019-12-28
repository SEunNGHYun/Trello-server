module.exports = function (sequelize, DataTypes) {
  const card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    }
  });
  card.associate = function (models) {
    card.belongsTo(models.container, {
      foreignKey: 'container_id'
    });
  };
  return card;
};