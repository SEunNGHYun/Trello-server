module.exports = function (sequelize, DataTypes) {
  const container = sequelize.define('container', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  container.associate = function (models) {
    container.belongsTo(models.board, {
      foreignKey: 'board_id'
    });
    container.hasMany(models.card, { foreignKey: 'container_id' });
  };
  return container;
};