const config = require("../config/database.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect:
    config.typeDB /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

module.exports = { sequelize, DataTypes };
