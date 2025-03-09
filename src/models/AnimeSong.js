const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnimeSong = sequelize.define('AnimeSong', {
    song_name: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        field: '歌曲名稱'
    },
    work_name: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: '作品名稱'
    },
    season_or_other: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: '季度或其他'
    },
    broadcast_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: '播出年份'
    },
    broadcast_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: '播出月份'
    },
    singer_or_group: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: '歌手或者表演團體'
    },
    song_url: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: '音樂網址'
    }
}, {
    tableName: 'anime_song', // 對應 MySQL 中的表名稱
    timestamps: false // 如果不需要 createdAt 和 updatedAt 欄位
});

module.exports = AnimeSong;