const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("..");

class contact_person extends Sequelize.Model {}

contact_person.init(
  {
    id_contact_face: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_contact_face",
      autoIncrement: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "полное имя контактного лица",
      primaryKey: false,
      field: "name",
      autoIncrement: false,
    },
    phone_num: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      defaultValue: null,
      comment: "номер телефона клиента\n",
      primaryKey: false,
      field: "phone_num",
      autoIncrement: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "электронная почта",
      primaryKey: false,
      field: "email",
      autoIncrement: false,
    },
    name_org: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "название организации, в которой работает контактное лицо",
      primaryKey: false,
      field: "name_org",
      autoIncrement: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "contact_person", timestamps: false }
);

module.exports = contact_person;