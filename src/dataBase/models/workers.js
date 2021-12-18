const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("..");

class workers extends Sequelize.Model{}

workers.init({
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false,
    },
    worker_name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "worker_name",
      autoIncrement: false,
    },
    worker_position: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "worker_position",
      autoIncrement: false,
    },
    phone_number: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "phone_number",
      autoIncrement: false,
    },
    login:{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    password:{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "workers", timestamps: false }
);

module.exports = workers;