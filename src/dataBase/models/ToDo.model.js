const Sequelize = require("sequelize");
const { sequelize } = require("..");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "todo" }
);

module.exports = ToDo;
