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
    isDone:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isFavourite:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    priority:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "todo" }
);

module.exports = ToDo;
