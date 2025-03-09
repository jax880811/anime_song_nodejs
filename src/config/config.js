module.exports = {
    port: process.env.PORT || 3000, // 設置應用程序的端口號，優先使用環境變量 `PORT`，否則默認為 3000
    db: {
        host: process.env.DB_HOST || 'localhost', // 設置數據庫的主機地址，優先使用環境變量 `DB_HOST`，否則默認為 'localhost'
        port: process.env.DB_PORT || 3306, // 設置數據庫的端口號，優先使用環境變量 `DB_PORT`，否則默認為 3306
        database: process.env.DB_DATABASE || 'anime_song', // 設置數據庫名稱，優先使用環境變量 `DB_DATABASE`，否則默認為 'anime_song'
        username: process.env.DB_USERNAME || 'root', // 設置數據庫用戶名，優先使用環境變量 `DB_USERNAME`，否則默認為 'root'
        password: process.env.DB_PASSWORD || '1qaz@WSX3edc' // 設置數據庫密碼，優先使用環境變量 `DB_PASSWORD`，否則默認為 '1qaz@WSX3edc'
    }
};

/*
 * config.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的配置文件，用於集中管理應用程序和數據庫的配置信息。
 * 以下是詳細說明：
 *
 * 1. **配置內容**
 *    - **port**：應用程序的端口號，優先使用環境變量 `PORT`，否則默認為 3000。
 *    - **db**：數據庫配置對象，包含以下屬性：
 *      - `host`：數據庫的主機地址，優先使用環境變量 `DB_HOST`，否則默認為 'localhost'。
 *      - `port`：數據庫的端口號，優先使用環境變量 `DB_PORT`，否則默認為 3306。
 *      - `database`：數據庫名稱，優先使用環境變量 `DB_DATABASE`，否則默認為 'anime_song'。
 *      - `username`：數據庫用戶名，優先使用環境變量 `DB_USERNAME`，否則默認為 'root'。
 *      - `password`：數據庫密碼，優先使用環境變量 `DB_PASSWORD`，否則默認為 '1qaz@WSX3edc'。
 *
 * 2. **Node.js 函式庫使用說明**
 *    - **process.env**：
 *      - 用於讀取環境變量，適合在不同環境（如開發、測試、生產）中動態配置應用程序。
 *      - 如果環境變量未設置，則使用默認值。
 *
 * 3. **未來改進**
 *    - 支持多環境配置文件（如 `config.dev.js`、`config.prod.js`）。
 *    - 添加敏感信息加密功能，保護數據庫密碼等敏感數據。
 *    - 使用 `.env` 文件管理環境變量，避免硬編碼。
 *
 * 4. **依賴**
 *    - `process.env`：用於讀取環境變量。
 *
 * 5. **注意事項**
 *    - 確保環境變量名稱與配置文件中的鍵名一致。
 *    - 在生產環境中，避免將敏感信息（如密碼）硬編碼在配置文件中。
 */