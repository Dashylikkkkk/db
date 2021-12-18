const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("..");
const contact_person = require("./contact_person");
const contract = require("./contract");
const equipment = require("./equipment");
// const info_task = require("./info_task");
const legal_entity = require("./legal_entity");
const Token = require("./Token");
const workers = require("./workers");

class tasks extends Sequelize.Model {}

tasks.init(
  {
    id_task: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
    },
    date_of_creation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "date_of_creation",
      autoIncrement: false,
    },
    date_of_completion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "date_of_completion",
      autoIncrement: false,
    },
    task_priority: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "task_priority",
      autoIncrement: false,
    },
    date_of_complition_worker: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: "дата исполнения задания",
      primaryKey: false,
      field: "date_of_complition_worker",
      autoIncrement: false,
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    modelName: "tasks",
    timestamps: false,
  }
);

// legal_entity.hasMany(contact_person);
contact_person.belongsTo(legal_entity, {
  foreignKey: "id_org",
});

contract.belongsTo(contact_person, {
  foreignKey: "id_contact_face",
});
// contact_person.hasMany(contract);

// workers.hasMany(contract);
contract.belongsTo(workers, {
  foreignKey: "id_worker",
});

// workers.hasMany(tasks);
tasks.belongsTo(workers, {
  foreignKey: "workerId",
});

// workers.hasMany(tasks);
tasks.belongsTo(workers, {
  foreignKey: "id_manager",
});


Token.belongsTo(workers, {
  foreignKey: "id_worker",
});

tasks.belongsTo(contract, {
  foreignKey:"id_contract"
});

equipment.belongsToMany(tasks, { through: "info_task", timestamps: false });
tasks.belongsToMany(equipment, { through: "info_task", timestamps: false });

module.exports = tasks;
