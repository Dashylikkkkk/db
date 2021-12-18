const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("..");

class equipment extends Sequelize.Model {}

equipment.init({
    id_contract: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_contract",
      autoIncrement: false,
    },
    name_equipment: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "полное название оборудования",
      primaryKey: false,
      field: "name_equipment",
      autoIncrement: false,
    },
    serial_num: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "serial_num",
      autoIncrement: false,
    },
    repair_warranty: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "кол-во времени действия гарантии (кол-во дней)",
      primaryKey: false,
      field: "repair_warranty",
      autoIncrement: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "equipment", timestamps: false }
);

module.exports = equipment;