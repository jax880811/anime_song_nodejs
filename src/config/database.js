const { Sequelize } = require('sequelize'); // 引入 Sequelize 庫，用於操作 MySQL 數據庫
const config = require('./config'); // 引入配置文件，獲取數據庫連接信息

// 創建 Sequelize 實例，用於連接 MySQL 數據庫
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host, // 數據庫主機地址
    dialect: 'mysql', // 指定數據庫類型為 MySQL
    logging: false // 關閉 SQL 日誌輸出，避免控制台輸出過多信息
});

module.exports = sequelize; // 導出 Sequelize 實例，供其他模塊使用

/*
 * database.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的數據庫配置文件，用於初始化 Sequelize 實例並連接 MySQL 數據庫。
 * 以下是詳細說明：
 *
 * 1. **Sequelize 實例初始化**
 *    - 使用 `new Sequelize()` 創建 Sequelize 實例，傳入數據庫名稱、用戶名、密碼和配置選項。
 *    - 配置選項：
 *      - `host`：數據庫主機地址，從配置文件中讀取。
 *      - `dialect`：指定數據庫類型為 MySQL。
 *      - `logging`：設置為 `false`，關閉 SQL 日誌輸出，避免控制台輸出過多信息。
 *
 * 2. **Node.js 函式庫使用說明**
 *    - **Sequelize**：
 *      - `Sequelize`：用於創建數據庫連接實例。
 *      - `new Sequelize()`：初始化 Sequelize 實例，傳入數據庫連接信息。
 *      - `dialect`：指定數據庫類型（如 MySQL、PostgreSQL、SQLite 等）。
 *      - `logging`：控制是否輸出 SQL 日誌，適合調試時使用。
 *
 * 3. **未來改進**
 *    - 支持連接池配置，提高數據庫連接性能。
 *    - 添加數據庫連接重試機制，增強穩定性。
 *    - 支持多數據庫連接，適合分庫分表場景。
 *
 * 4. **依賴**
 *    - `Sequelize`：用於操作 MySQL 數據庫。
 *    - `config`：用於讀取數據庫連接信息。
 *
 * 5. **注意事項**
 *    - 確保數據庫連接信息（如主機地址、用戶名、密碼）正確無誤。
 *    - 在生產環境中，建議啟用連接池並設置合理的連接數。
 *    - 如果數據庫連接失敗，需檢查網絡連接和數據庫服務狀態。
 */