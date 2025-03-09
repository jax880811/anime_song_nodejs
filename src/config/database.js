const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    logging: false // 關閉 SQL 日誌輸出
});

module.exports = sequelize;