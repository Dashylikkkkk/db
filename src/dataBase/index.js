const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  port: 5432,
  dialect: "postgres",
  host: "localhost",
  database: "tasks_db",
  username: "postgres",
  password: "12345",
});

async function func() {
  try {
    await sequelize.authenticate();
    // await sequelize.dropSchema("public",{});
    // await sequelize.createSchema("public",{});
    // await sequelize.sync();
    await sequelize.sync();
    console.log("Connected");
  } catch (error) {
    console.error("Not connected", error);
  }
}

module.exports = {
  sequelize,
  func,
};
