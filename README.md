# anime_song_nodejs

### 1. **專案名稱**

**Anime Song Express**

（動漫歌曲管理系統）

---

### 2. **專案目的**

本專案旨在開發一個基於 Node.js 和 Express 的動漫歌曲管理系統，用於：

- **管理動漫歌曲信息**：包括歌曲名稱、作品名稱、季度、播出時間、歌手、音樂網址等。
- **提供搜索功能**：用戶可以根據歌曲名稱搜索相關信息。
- **實現 CRUD 操作**：允許用戶對歌曲信息進行創建、讀取、更新和刪除操作。

---

### 3. **專案功能**

以下是專案的主要功能模塊：

### (1) **歌曲管理**

- **查看所有歌曲**：顯示數據庫中所有動漫歌曲的詳細信息。
- **添加新歌曲**：通過表單添加新的動漫歌曲信息。
- **編輯歌曲**：修改現有歌曲的信息。
- **刪除歌曲**：從數據庫中刪除指定的歌曲。

### (2) **API 接口**

- **RESTful API**：提供標準的 API 接口，支持 GET、POST、PUT、DELETE 方法。
- **數據格式**：所有 API 返回 JSON 格式的數據。

---

### 4. **技術棧**

以下是專案使用的技術和工具：

### (1) **後端**

- **Node.js**：JavaScript 運行環境。
- **Express**：Web 應用框架。
- **Sequelize**：ORM 工具，用於操作 MySQL 數據庫。

### (2) **數據庫**

- **MySQL**：關係型數據庫，用於存儲動漫歌曲信息。

### (3) **前端**

- **HTML/CSS/JavaScript**：用於構建簡單的用戶界面。

---

### 5. **專案結構**

以下是專案的主要目錄結構：

複製

```
anime_song_express/
├── src/
│   ├── config/          # 配置文件
│   ├── controllers/     # 控制器
│   ├── models/          # 數據模型
│   ├── routes/          # 路由
│   └── app.js           # 主應用文件
├── migrations/          # 數據庫遷移文件
├── package.json         # 專案配置文件
└── README.md            # 專案說明文件
```

---

📖 專案介紹
Anime Song Express 是一個基於 Node.js 與 Express.js 架設的動漫歌曲管理平台。
提供：

使用者登入/註冊

CRUD 管理動漫歌曲資料

搜尋功能

Session 管理（登入驗證）

資料庫持久化（使用 MySQL）

同時支援 Docker 快速部署，能一鍵啟動完整開發環境。

🚀 功能特性
🎵 動漫歌曲的新增、刪除、更新、查詢

🔎 搜尋特定歌曲（支援模糊搜尋）

👤 使用者註冊與登入（Session 控制）

🔒 密碼加密存儲（Bcrypt）

📂 支援 API 介面與 Web 頁面介面

🐳 Docker 一鍵部署

🛡️ 環境變數管理（.env）

🛠️ 技術棧

類別	技術
語言	JavaScript (Node.js)
Web 框架	Express.js
ORM	Sequelize
資料庫	MySQL 8
前端模板引擎	EJS
Session管理	express-session + connect-session-sequelize
容器化	Docker + Docker Compose
加密技術	bcryptjs
環境變數管理	dotenv
🏛️ 系統架構
plaintext
複製
編輯
瀏覽器 / 客戶端
   ↓
Express 伺服器 (Node.js)
   ↓
Sequelize ORM
   ↓
MySQL 資料庫
🗄️ 資料庫設計
anime_song 資料表

欄位名稱	資料型別	描述
歌曲名稱	VARCHAR(45)	主鍵，歌曲名稱
作品名稱	VARCHAR(45)	動漫作品名稱
季度或其他	VARCHAR(45)	放送季度或其他資訊
播出年份	INT	放送年份
播出月份	INT	放送月份
歌手或者表演團體	VARCHAR(45)	歌手或表演團體
音樂網址	VARCHAR(100)	歌曲播放連結
user 資料表

欄位名稱	資料型別	描述
username	VARCHAR(45)	使用者帳號 (唯一)
password	VARCHAR(100)	加密後的密碼
🗂️ 專案結構
plaintext
複製
編輯
E:\vscode\anime_song_express
├── src
│   ├── config
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers
│   │   ├── animeSongController.js
│   │   ├── authController.js
│   │   ├── registerController.js
│   │   └── searchController.js
│   ├── models
│   │   ├── AnimeSong.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routes
│   │   └── index.js
│   ├── views
│   │   ├── crud.html
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   └── search_music.ejs
│   └── app.js
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
└── package.json
🛠️ 安裝與使用指南
克隆專案

bash
複製
編輯
git clone https://github.com/你的帳號/anime_song_express.git
cd anime_song_express
安裝 Node.js 依賴

bash
複製
編輯
npm install
設定 .env 檔案

bash
複製
編輯
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=anime_song
DB_USERNAME=root
DB_PASSWORD=你的資料庫密碼
啟動本地伺服器（開發模式）

bash
複製
編輯
npm run dev
瀏覽器打開

arduino
複製
編輯
http://localhost:3000
🐳 使用 Docker 啟動
前置需求
已安裝好 Docker 與 Docker Compose。

一鍵啟動
bash
複製
編輯
docker-compose up --build
Node.js 服務會在 http://localhost:3000

MySQL 資料庫服務也會自動啟動，無需額外安裝。

🔑 環境變數設定 (.env)
範例 .env：

ini
複製
編輯
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=anime_song
DB_USERNAME=root
DB_PASSWORD=1qaz@WSX3edc
⚡ 重要指令

指令	功能
npm install	安裝所有依賴套件
npm run dev	使用 nodemon 啟動開發伺服器
npm run start	啟動正式伺服器（node）
docker-compose up	Docker 方式啟動整個專案
🌟 未來規劃
✨ API 加上資料驗證與防範 SQL 注入

✨ 加入 JWT 登入驗證機制（強化 API 保護）

✨ 使用 multer 支援歌曲封面上傳

✨ 加入搜尋分頁功能

✨ 前端升級成 SPA（React 或 Vue.js）

