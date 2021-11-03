const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  port: 5432,
  dialect: "postgres",
  host: "localhost",
  database: "db",
  username: "user",
  password: "12345",
});

async function func() {
  try {
    await sequelize.authenticate();
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
