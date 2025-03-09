//const { AnimeSong } = require('../models');
const AnimeSong = require('../models/AnimeSong'); // 引入 AnimeSong 模型，用於操作數據庫中的動漫歌曲數據
const { Op } = require('sequelize'); // 引入 Sequelize 的 Op 操作符，用於構建複雜的查詢條件

// 搜索音樂 (HTML 渲染)
exports.searchMusic = async (req, res) => {
    const query = req.query.q || ''; // 從請求的查詢參數中獲取搜索關鍵字，如果沒有則設為空字符串
    let results = []; // 初始化結果數組，用於存儲搜索結果

    if (query) {
        // 如果有搜索關鍵字，則執行搜索
        results = await AnimeSong.findAll({
            where: {
                歌曲名稱: { [Op.like]: `%${query}%` } // 使用 Sequelize 的 Op.like 進行模糊查詢，查找歌曲名稱包含關鍵字的記錄
            },
            attributes: ['歌曲名稱', '音樂網址'] // 只返回歌曲名稱和音樂網址兩個字段
        });
    }

    const allSongs = await AnimeSong.findAll(); // 獲取數據庫中的所有歌曲數據，用於渲染頁面時顯示完整列表

    // 渲染 search_music 視圖，並傳遞查詢關鍵字、搜索結果和所有歌曲數據
    res.render('search_music', {
        query: query,
        results: results,
        allSongs: allSongs
    });
};

// 搜索音樂 (API)
exports.searchMusicAPI = async (req, res) => {
    const query = req.query.q || ''; // 從請求的查詢參數中獲取搜索關鍵字，如果沒有則設為空字符串
    let results = []; // 初始化結果數組，用於存儲搜索結果

    if (query) {
        // 如果有搜索關鍵字，則執行搜索
        results = await AnimeSong.findAll({
            where: {
                歌曲名稱: { [Op.like]: `%${query}%` } // 使用 Sequelize 的 Op.like 進行模糊查詢，查找歌曲名稱包含關鍵字的記錄
            },
            attributes: ['歌曲名稱', '音樂網址'] // 只返回歌曲名稱和音樂網址兩個字段
        });
    }

    // 返回 JSON 格式的搜索結果，包含查詢關鍵字和搜索結果
    res.json({ query: query, results: results });
};

/*
 * searchController.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的搜索控制器，負責處理與動漫歌曲搜索相關的業務邏輯。
 * 它通過 Sequelize 與 MySQL 數據庫進行交互，並提供以下功能：
 *
 * 1. **搜索音樂 (HTML 渲染) (GET /search/music)**
 *    - 從查詢參數中獲取搜索關鍵字 `q`。
 *    - 使用 `AnimeSong.findAll()` 進行模糊查詢，查找歌曲名稱包含關鍵字的記錄。
 *    - 獲取數據庫中的所有歌曲數據，用於渲染頁面時顯示完整列表。
 *    - 渲染 `search_music` 視圖，並傳遞查詢關鍵字、搜索結果和所有歌曲數據。
 *
 * 2. **搜索音樂 (API) (GET /api/search/music)**
 *    - 從查詢參數中獲取搜索關鍵字 `q`。
 *    - 使用 `AnimeSong.findAll()` 進行模糊查詢，查找歌曲名稱包含關鍵字的記錄。
 *    - 返回 JSON 格式的搜索結果，包含查詢關鍵字和搜索結果。
 *
 * 3. **共用邏輯**
 *    - 兩個函數都使用 `findAll` 方法進行模糊查詢，並只返回 `歌曲名稱` 和 `音樂網址` 兩個字段。
 *    - 都支持空查詢（即不提供關鍵字時返回空結果）。
 *
 * 4. **差異**
 *    - `searchMusic` 用於渲染 HTML 頁面，返回完整的視圖。
 *    - `searchMusicAPI` 用於提供 API 接口，返回 JSON 數據。
 *
 * 5. **Node.js 函式庫使用說明**
 *    - **Sequelize**：
 *      - `findAll()`：查詢數據庫中符合條件的記錄。
 *      - `Op.like`：用於構建模糊查詢條件。
 *      - `attributes`：指定返回的字段，減少不必要的數據傳輸。
 *    - **Express**：
 *      - `req.query`：獲取 URL 查詢參數。
 *      - `res.render()`：渲染視圖並返回 HTML 頁面。
 *      - `res.json()`：返回 JSON 格式的響應。
 *
 * 6. **未來改進**
 *    - 添加分頁功能，以支持大量數據的搜索。
 *    - 添加輸入驗證，確保查詢參數的安全性。
 *    - 添加緩存機制，提高搜索性能。
 *    - 支持多字段搜索（如根據歌手、作品名稱等進行搜索）。
 *    - 添加搜索結果的高亮顯示功能。
 *    - 實現自動補全（Auto-complete）功能，提升用戶體驗。
 *
 * 7. **依賴**
 *    - `AnimeSong` 模型：用於與數據庫中的 `anime_song` 表進行交互。
 *    - `Op` 操作符：用於構建複雜的查詢條件（如模糊查詢）。
 *    - `Express`：用於處理 HTTP 請求和響應。
 *
 * 8. **注意事項**
 *    - 確保模型定義與數據庫表結構一致，否則可能導致查詢失敗。
 *    - 如果數據庫表結構變更，需同步更新模型定義。
 *    - 在生產環境中，建議啟用緩存以提高性能。
 */