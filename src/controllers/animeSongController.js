const AnimeSong = require('../models/AnimeSong'); // 引入 AnimeSong 模型，用於操作數據庫中的動漫歌曲數據
const { Op } = require('sequelize');

/*
// Cursor-based 分頁實作
exports.getAnimeSongs = async (req, res) => {
  try {
    const limit = 10;
    const lastSongName = req.query.lastSongName || null;

    let where = {};
    if (lastSongName) {
      where.song_name = { [Op.gt]: lastSongName }; // 只撈比上一筆大的（ASC）
    }

    const songs = await AnimeSong.findAll({
      where,
      limit,
      order: [['song_name', 'ASC']],
    });

    const total = await AnimeSong.count();

    res.json({
      songs,
      totalItems: total,
      hasNext: songs.length === limit,
      lastSongName: songs.length > 0 ? songs[songs.length - 1].song_name : null
    });
  } catch (err) {
    console.error('[getAnimeSongs] Error:', err.message);
    res.status(500).json({ message: '伺服器錯誤：' + err.message });
  }
};
*/

exports.getAnimeSongs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;    // ⏱️ 第幾頁（預設第1頁）
    const limit = 10;                              // ⏱️ 每頁筆數限制
    const offset = (page - 1) * limit;             // ⏱️ 計算 OFFSET 起始位置

    // 🚀 資料查詢，LIMIT + OFFSET 搭配索引加速
    const songs = await AnimeSong.findAll({
      limit,
      offset,
      order: [['song_name', 'ASC']]               // 🔡 排序字段（若 song_name 有索引效果更好）
    });

    // 🧠 快速查詢總數（可用快取或維護總數欄位）
    const countResult = await AnimeSong.count();  // ⚠️ 可替換成 Redis/MEMO 快取

    // 📤 回傳格式化分頁結果
    res.json({
      songs,                                       // 🎵 本頁歌曲資料
      totalPages: Math.ceil(countResult / limit), // 📄 總頁數
      currentPage: page                           // 📍當前頁數
    });
  } catch (err) {
    console.error('[getAnimeSongs] 錯誤：', err.message);
    res.status(500).json({ message: '伺服器錯誤：' + err.message });
  }
};


/*
// 獲取所有動漫歌曲
exports.getAnimeSongs = async (req, res) => {
    try {
        const songs = await AnimeSong.findAll(); // 使用 Sequelize 的 findAll 方法，從數據庫中獲取所有動漫歌曲
        res.json(songs); // 將獲取的歌曲數據以 JSON 格式返回給客戶端
    } catch (err) {

        res.status(500).json({ message: err.message }); // 如果發生錯誤，返回 500 狀態碼並附上錯誤訊息
    }
};
*/
// 創建新的動漫歌曲
exports.createAnimeSong = async (req, res) => {
    try {
        const song = await AnimeSong.create(req.body); // 使用 Sequelize 的 create 方法，將請求體中的數據插入到數據庫中
        console.log(req.body);
        res.status(201).json(song); // 返回 201 狀態碼（表示創建成功）並附上新創建的歌曲數據
    } catch (err) {
        console.error("錯誤格式:" , req.body);
        console.error("錯誤訊息:" , err.message);
        res.status(400).json({ message: err.message }); // 如果發生錯誤，返回 400 狀態碼並附上錯誤訊息
    }
};

// 根據歌曲名稱獲取單個動漫歌曲
exports.getAnimeSongByName = async (req, res) => {
    try {
        const song = await AnimeSong.findByPk(req.params.song_name); // 使用 Sequelize 的 findByPk 方法，根據歌曲名稱（主鍵）查找單個歌曲
        if (!song) return res.status(404).json({ message: 'Song not found' }); // 如果找不到歌曲，返回 404 狀態碼並附上錯誤訊息
        res.json(song); // 返回找到的歌曲數據
    } catch (err) {
        console.error("錯誤訊息:" , err.message);
        res.status(500).json({ message: err.message }); // 如果發生錯誤，返回 500 狀態碼並附上錯誤訊息
    }
};

// 更新動漫歌曲
exports.updateAnimeSong = async (req, res) => {
    try {
        const [updated] = await AnimeSong.update(req.body, {
            where: { song_name: req.params.song_name } // 使用 Sequelize 的 update 方法，根據歌曲名稱更新對應的歌曲數據
        });
        if (!updated) return res.status(404).json({ message: 'Song not found' }); // 如果找不到歌曲，返回 404 狀態碼並附上錯誤訊息
        const updatedSong = await AnimeSong.findByPk(req.params.song_name); // 再次查找更新後的歌曲數據
        console.log(req.body);
        res.json(updatedSong); // 返回更新後的歌曲數據
    } catch (err) {
        console.error("錯誤格式: " , req.body);
        console.error("錯誤訊息: " , err.message);
        res.status(400).json({ message: err.message }); // 如果發生錯誤，返回 400 狀態碼並附上錯誤訊息
    }
};

// 刪除動漫歌曲
exports.deleteAnimeSong = async (req, res) => {
    try {
        const deleted = await AnimeSong.destroy({
            where: { song_name: req.params.song_name } // 使用 Sequelize 的 destroy 方法，根據歌曲名稱刪除對應的歌曲數據
        });
        if (!deleted) return res.status(404).json({ message: 'Song not found' }); // 如果找不到歌曲，返回 404 狀態碼並附上錯誤訊息
        console.log(req.body);
        res.json({ message: 'Song deleted' }); // 返回刪除成功的訊息
    } catch (err) {
        console.error("錯誤格式: " , req.body);
        console.error("錯誤訊息: " , err.message);
        res.status(500).json({ message: err.message }); // 如果發生錯誤，返回 500 狀態碼並附上錯誤訊息
    }
};

// 隨機撈一首歌
exports.getRandomSong = async (req, res) => {
    try {
      const count = await AnimeSong.count();
      const randomIndex = Math.floor(Math.random() * count);
      const song = await AnimeSong.findOne({ offset: randomIndex });
      
      res.json(song);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

/*
 * animeSongController.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的控制器，負責處理與動漫歌曲相關的業務邏輯。
 * 它通過 Sequelize 與 MySQL 數據庫進行交互，並提供以下功能：
 *
 * 1. **獲取所有動漫歌曲 (GET /api/music)**
 *    - 使用 `AnimeSong.findAll()` 查詢所有歌曲。
 *    - 返回 JSON 格式的歌曲列表。
 *    - 如果發生錯誤，返回 500 狀態碼和錯誤訊息。
 *
 * 2. **創建新的動漫歌曲 (POST /api/music)**
 *    - 使用 `AnimeSong.create(req.body)` 插入新歌曲。
 *    - 返回創建的歌曲信息，狀態碼為 201（表示創建成功）。
 *    - 如果發生錯誤，返回 400 狀態碼和錯誤訊息。
 *
 * 3. **根據歌曲名稱獲取單個動漫歌曲 (GET /api/music/:song_name)**
 *    - 使用 `AnimeSong.findByPk(req.params.song_name)` 查詢單個歌曲。
 *    - 如果找不到歌曲，返回 404 狀態碼和錯誤訊息。
 *    - 返回查詢到的歌曲信息。
 *    - 如果發生錯誤，返回 500 狀態碼和錯誤訊息。
 *
 * 4. **更新動漫歌曲 (PUT /api/music/:song_name)**
 *    - 使用 `AnimeSong.update(req.body, { where: { song_name: req.params.song_name } })` 更新歌曲信息。
 *    - 如果找不到歌曲，返回 404 狀態碼和錯誤訊息。
 *    - 返回更新後的歌曲信息。
 *    - 如果發生錯誤，返回 400 狀態碼和錯誤訊息。
 *
 * 5. **刪除動漫歌曲 (DELETE /api/music/:song_name)**
 *    - 使用 `AnimeSong.destroy({ where: { song_name: req.params.song_name } })` 刪除歌曲。
 *    - 如果找不到歌曲，返回 404 狀態碼和錯誤訊息。
 *    - 返回刪除成功的訊息。
 *    - 如果發生錯誤，返回 500 狀態碼和錯誤訊息。
 *
 * 6. **Node.js 函式庫使用說明**
 *    - **Sequelize**：
 *      - `findAll()`：查詢數據庫中的所有記錄。
 *      - `create()`：插入一條新記錄。
 *      - `findByPk()`：根據主鍵查詢單條記錄。
 *      - `update()`：更新符合條件的記錄。
 *      - `destroy()`：刪除符合條件的記錄。
 *    - **Express**：
 *      - `req.params`：獲取路由參數（如 `song_name`）。
 *      - `req.body`：獲取請求體中的數據。
 *      - `res.json()`：返回 JSON 格式的響應。
 *      - `res.status()`：設置響應的狀態碼。
 *
 * 7. **未來改進**
 *    - 添加分頁功能，提高查詢性能。
 *    - 實現用戶身份驗證，保護敏感操作。
 *    - 添加輸入驗證，防止 SQL 注入和 XSS 攻擊。
 *    - 使用日誌記錄工具（如 `winston`）記錄請求與錯誤信息。
 *    - 編寫單元測試，確保代碼質量。
 *
 * 8. **依賴**
 *    - `AnimeSong` 模型：用於與數據庫中的 `anime_song` 表進行交互。
 *    - `Sequelize`：用於操作 MySQL 數據庫。
 *    - `Express`：用於處理 HTTP 請求和響應。
 *
 * 9. **注意事項**
 *    - 確保模型定義與數據庫表結構一致，否則可能導致操作失敗。
 *    - 如果數據庫表結構變更，需同步更新模型定義。
 */