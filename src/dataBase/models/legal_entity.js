const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("..");

class legal_entity extends Sequelize.Model {}

legal_entity.init({
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "id юр.лица",
      primaryKey: true,
      field: "id",
      autoIncrement: false,
    },
    org_name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "название фирмы (юр. лица)",
      primaryKey: false,
      field: "org_name",
      autoIncrement: false,
    },
    general_manager: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "генеральный директор фирмы (юр.лица)",
      primaryKey: false,
      field: "general_manager",
      autoIncrement: false,
    },
    phone: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      defaultValue: null,
      comment: "номер телефона для связи",
      primaryKey: false,
      field: "phone",
      autoIncrement: false,
    },
    inn: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      defaultValue: null,
      comment: "инн юр.лица",
      primaryKey: false,
      field: "inn",
      autoIncrement: false,
      unique: "legal_entity_inn_key",
    },
    fax: {
      type: DataTypes.CHAR(12),
      allowNull: true,
      defaultValue: null,
      comment: "факс юр.лица",
      primaryKey: false,
      field: "fax",
      autoIncrement: false,
    },
    actual_address: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "фактический адрес юр. лица",
      primaryKey: false,
      field: "actual_address",
      autoIncrement: false,
    },
    legal_address: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "юридический адрес юр. лица ",
      primaryKey: false,
      field: "legal_address",
      autoIncrement: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment:
        "статус клиента (потенциальные, текущие, ранее заключенные договора)",
      primaryKey: false,
      field: "status",
      autoIncrement: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "электронная почта юр.лциа (если есть)",
      primaryKey: false,
      field: "email",
      autoIncrement: false,
    },
    bank_details: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: null,
      comment: "банковские реквизиты юр.лица",
      primaryKey: false,
      field: "bank_details",
      autoIncrement: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "legal_entity", timestamps: false }
);

module.exports = legal_entity;