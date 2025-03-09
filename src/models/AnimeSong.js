const { DataTypes } = require('sequelize'); // 引入 Sequelize 的 DataTypes，用於定義模型字段的數據類型
const sequelize = require('../config/database'); // 引入 Sequelize 實例，用於連接數據庫

// 定義 AnimeSong 模型
const AnimeSong = sequelize.define('AnimeSong', {
    song_name: {
        type: DataTypes.STRING(45), // 定義字段類型為字符串，最大長度為 45
        primaryKey: true, // 設置為主鍵
        allowNull: false, // 不允許為空
        field: '歌曲名稱' // 對應數據庫表中的字段名稱
    },
    work_name: {
        type: DataTypes.STRING(45), // 定義字段類型為字符串，最大長度為 45
        allowNull: true, // 允許為空
        field: '作品名稱' // 對應數據庫表中的字段名稱
    },
    season_or_other: {
        type: DataTypes.STRING(45), // 定義字段類型為字符串，最大長度為 45
        allowNull: true, // 允許為空
        field: '季度或其他' // 對應數據庫表中的字段名稱
    },
    broadcast_year: {
        type: DataTypes.INTEGER, // 定義字段類型為整數
        allowNull: true, // 允許為空
        field: '播出年份' // 對應數據庫表中的字段名稱
    },
    broadcast_month: {
        type: DataTypes.INTEGER, // 定義字段類型為整數
        allowNull: true, // 允許為空
        field: '播出月份' // 對應數據庫表中的字段名稱
    },
    singer_or_group: {
        type: DataTypes.STRING(45), // 定義字段類型為字符串，最大長度為 45
        allowNull: true, // 允許為空
        field: '歌手或者表演團體' // 對應數據庫表中的字段名稱
    },
    song_url: {
        type: DataTypes.STRING(100), // 定義字段類型為字符串，最大長度為 100
        allowNull: true, // 允許為空
        field: '音樂網址' // 對應數據庫表中的字段名稱
    }
}, {
    tableName: 'anime_song', // 指定對應的 MySQL 表名稱
    timestamps: false // 禁用 Sequelize 的自動添加 createdAt 和 updatedAt 字段
});

module.exports = AnimeSong; // 導出 AnimeSong 模型，供其他模塊使用

/*
 * AnimeSong.js 筆記
 *
 * 這個文件定義了動漫歌曲管理系統的數據模型 `AnimeSong`，用於與 MySQL 數據庫中的 `anime_song` 表進行映射。
 * 以下是詳細說明：
 *
 * 1. **模型定義**
 *    - 使用 `sequelize.define` 方法定義模型。
 *    - 模型名稱：`AnimeSong`。
 *    - 字段定義：
 *      - `song_name`：歌曲名稱，類型為字符串，最大長度為 45，設置為主鍵且不允許為空。
 *      - `work_name`：作品名稱，類型為字符串，最大長度為 45，允許為空。
 *      - `season_or_other`：季度或其他信息，類型為字符串，最大長度為 45，允許為空。
 *      - `broadcast_year`：播出年份，類型為整數，允許為空。
 *      - `broadcast_month`：播出月份，類型為整數，允許為空。
 *      - `singer_or_group`：歌手或表演團體，類型為字符串，最大長度為 45，允許為空。
 *      - `song_url`：音樂網址，類型為字符串，最大長度為 100，允許為空。
 *    - 配置選項：
 *      - `tableName`：指定對應的 MySQL 表名稱為 `anime_song`。
 *      - `timestamps`：禁用 Sequelize 的自動添加 `createdAt` 和 `updatedAt` 字段。
 *
 * 2. **Node.js 函式庫使用說明**
 *    - **Sequelize**：
 *      - `DataTypes`：用於定義模型字段的數據類型（如字符串、整數等）。
 *      - `sequelize.define`：用於定義數據模型，並映射到數據庫表。
 *      - `primaryKey`：設置字段為主鍵。
 *      - `allowNull`：設置字段是否允許為空。
 *      - `field`：指定字段在數據庫表中的名稱。
 *      - `tableName`：指定模型對應的數據庫表名稱。
 *      - `timestamps`：控制是否自動添加 `createdAt` 和 `updatedAt` 字段。
 *
 * 3. **未來改進**
 *    - 添加字段驗證，確保數據的完整性（如年份範圍、URL 格式等）。
 *    - 支持多語言字段名稱，便於國際化。
 *    - 添加索引，提高查詢性能。
 *    - 實現軟刪除（Soft Delete）功能，保留刪除記錄。
 *
 * 4. **依賴**
 *    - `sequelize`：用於與 MySQL 數據庫進行交互。
 *    - `DataTypes`：用於定義模型字段的數據類型。
 *
 * 5. **注意事項**
 *    - 模型定義需與數據庫表結構一致，否則可能導致操作失敗。
 *    - 如果數據庫表結構變更，需同步更新模型定義。
 */