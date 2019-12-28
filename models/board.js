module.exports = function (sequelize, DataTypes) {
  const board = sequelize.define('board', {
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
  board.associate = function (models) {
    board.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    board.hasMany(models.container, { foreignKey: 'board_id' });
  };
  return board;
};