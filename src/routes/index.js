const express = require('express'); // 引入 Express 框架，用於創建 Web 服務器
const router = express.Router(); // 創建一個 Express 路由實例，用於定義路由
const searchController = require('../controllers/searchController'); // 引入搜索控制器，處理搜索相關的邏輯
const animeSongController = require('../controllers/animeSongController'); // 引入動漫歌曲控制器，處理 CRUD 相關的邏輯
const path = require('path'); // 引入 Node.js 的 path 模塊，用於處理文件路徑
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');


// 登入相關路由
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

// 註冊相關路由
router.get('/register', registerController.getRegister);
router.post('/register', registerController.postRegister);

// 保護 CRUD 路由的中间件
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// 受保護的 CRUD 路由
router.get('/crud', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/crud.html'));
});

// 搜索音樂 (HTML)
router.get('/search', searchController.searchMusic); // 定義 GET 路由，用於處理搜索音樂的 HTML 頁面請求

// 搜索音樂 (API)
router.get('/api/search', searchController.searchMusicAPI); // 定義 GET 路由，用於處理搜索音樂的 API 請求

// 動漫歌曲 CRUD 操作
router.get('/api/music', animeSongController.getAnimeSongs); // 定義 GET 路由，用於獲取所有動漫歌曲
router.post('/api/music', animeSongController.createAnimeSong); // 定義 POST 路由，用於創建新的動漫歌曲
router.get('/api/music/:song_name', animeSongController.getAnimeSongByName); // 定義 GET 路由，用於根據歌曲名稱獲取單個動漫歌曲
router.put('/api/music/:song_name', animeSongController.updateAnimeSong); // 定義 PUT 路由，用於更新動漫歌曲
router.delete('/api/music/:song_name', animeSongController.deleteAnimeSong); // 定義 DELETE 路由，用於刪除動漫歌曲

// 提供 CRUD 操作的 HTML 頁面
router.get('/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud.html')); // 發送 CRUD 操作的 HTML 頁面
});

module.exports = router; // 導出路由實例，供其他模塊使用

/*
 * index.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的路由配置文件，負責定義所有 API 和頁面路由。
 * 以下是詳細說明：
 *
 * 1. **路由定義**
 *    - **搜索音樂 (HTML)**：
 *      - 路由：`GET /search`
 *      - 處理函數：`searchController.searchMusic`
 *      - 功能：渲染搜索音樂的 HTML 頁面。
 *    - **搜索音樂 (API)**：
 *      - 路由：`GET /api/search`
 *      - 處理函數：`searchController.searchMusicAPI`
 *      - 功能：提供搜索音樂的 API 接口，返回 JSON 格式的搜索結果。
 *    - **動漫歌曲 CRUD 操作**：
 *      - 獲取所有動漫歌曲：`GET /api/music`，處理函數：`animeSongController.getAnimeSongs`。
 *      - 創建新的動漫歌曲：`POST /api/music`，處理函數：`animeSongController.createAnimeSong`。
 *      - 根據歌曲名稱獲取單個動漫歌曲：`GET /api/music/:song_name`，處理函數：`animeSongController.getAnimeSongByName`。
 *      - 更新動漫歌曲：`PUT /api/music/:song_name`，處理函數：`animeSongController.updateAnimeSong`。
 *      - 刪除動漫歌曲：`DELETE /api/music/:song_name`，處理函數：`animeSongController.deleteAnimeSong`。
 *    - **CRUD 操作頁面**：
 *      - 路由：`GET /crud`
 *      - 功能：發送 CRUD 操作的 HTML 頁面。
 *
 * 2. **Node.js 函式庫使用說明**
 *    - **Express**：
 *      - `express.Router()`：用於創建模塊化的路由處理程序。
 *      - `router.get()`：定義 GET 請求的路由。
 *      - `router.post()`：定義 POST 請求的路由。
 *      - `router.put()`：定義 PUT 請求的路由。
 *      - `router.delete()`：定義 DELETE 請求的路由。
 *    - **Path**：
 *      - `path.join()`：用於拼接文件路徑，確保跨平台兼容性。
 *      - `res.sendFile()`：用於發送靜態文件（如 HTML 文件）。
 *
 * 3. **未來改進**
 *    - 添加身份驗證中間件，保護敏感操作（如創建、更新、刪除）。
 *    - 實現路由分組，提高代碼可讀性和維護性。
 *    - 添加輸入驗證中間件，防止無效數據提交。
 *    - 支持文件上傳功能，用於上傳歌曲封面或音樂文件。
 *
 * 4. **依賴**
 *    - `express`：用於創建 Web 服務器和定義路由。
 *    - `path`：用於處理文件路徑。
 *    - `searchController`：處理搜索相關的業務邏輯。
 *    - `animeSongController`：處理動漫歌曲的 CRUD 操作。
 *
 * 5. **注意事項**
 *    - 路由定義需與前端請求保持一致，否則可能導致 404 錯誤。
 *    - 如果路由邏輯複雜，建議拆分到多個路由文件中。
 */