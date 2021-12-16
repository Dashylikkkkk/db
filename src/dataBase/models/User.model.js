const Sequelize = require("sequelize");
const { sequelize } = require("..");
const Comment = require("./Comment.model");
const ToDo = require("./ToDo.model");
const Token = require("./Token.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(ToDo);
ToDo.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Token);
Token.belongsTo(User, {
  foreignKey: "userId",
});

ToDo.hasMany(Comment);
Comment.belongsTo(ToDo, {
  foreignKey: "todoId",
});
module.exports = User;
