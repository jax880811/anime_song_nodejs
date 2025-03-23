﻿# anime_song_nodejs

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

复制

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

