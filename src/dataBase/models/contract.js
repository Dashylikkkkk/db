const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("..");

class contract extends Sequelize.Model {}

contract.init(
  {
    id_contract: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_contract",
      autoIncrement: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "contract", timestamps: false  }
);

module.exports = contract;