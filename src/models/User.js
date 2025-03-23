// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set(value) {
      // 自動哈希密碼
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    }
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;