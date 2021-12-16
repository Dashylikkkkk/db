const Sequelize = require("sequelize");
const { sequelize } = require("..");

class Comment extends Sequelize.Model {}

Comment.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "DONE"),
      defaultValue: "ACTIVE",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "comment" }
);

module.exports = Comment;
