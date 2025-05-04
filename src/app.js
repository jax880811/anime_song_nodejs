const express = require('express'); // 引入 Express 框架，用於創建 Web 服務器
const path = require('path'); // 引入 Node.js 的 path 模塊，用於處理文件路徑
const config = require('./config/config'); // 引入配置文件，包含應用程序的配置信息（如端口號）
const sequelize = require('./config/database'); // 引入 Sequelize 實例，用於連接 MySQL 數據庫
const routes = require('./routes'); // 引入路由文件，定義所有 API 和頁面路由
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express(); // 創建 Express 應用程序實例


// 數據庫連接與同步
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database synced');
    sessionStore.sync();  // 同步會話表
  })
  .catch(err => console.error('Database error:', err));
/*
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
    return sequelize.sync({ force: false }); // 自動創建表（force: false 保留現有數據）
  })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database error:', err));
*/

// 設置模板引擎
app.set('view engine', 'ejs'); // 設置視圖引擎為 EJS，用於渲染 HTML 頁面
app.set('views', path.join(__dirname, 'views')); // 設置視圖文件的路徑為 `src/views`

// 測試 MySQL 連接
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL')) // 如果連接成功，輸出連接成功信息
    .catch(err => console.error('Could not connect to MySQL', err)); // 如果連接失敗，輸出錯誤信息

// 創建 Sequelize 存儲實例
const sessionStore = new SequelizeStore({
  db: sequelize,  // 使用已有的 Sequelize 實例
  tableName: 'sessions'  // 自定義會話表名
});


// JWT 驗證中介
function authenticateJWT(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).send('Token missing');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'reweave880811');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}


/*
// 配置 Session
app.use(session({
  secret: 'reweave880811',  // 生產環境應使用環境變量
  store: sessionStore,  // 使用數據庫存儲會話
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,  // 開發環境設為 false（若用 HTTPS 則設為 true）
    maxAge: 24 * 60 * 60 * 1000
  }
}));
*/


/*
// 配置 Session
app.use(session({
    secret: 'reweave880811', // 使用環境變量或隨機字符串
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production', // 生產環境需啟用 HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 1天
    }
  }));

*/
// 中間件

app.use(cookieParser());
app.use(express.json()); // 解析請求體中的 JSON 數據
app.use(express.urlencoded({ extended: true })); // 解析請求體中的 URL 編碼數據


// 路由
app.use('/', routes); // 使用定義的路由處理所有請求

// 啟動伺服器
app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`); // 啟動服務器並監聽指定端口
});

/*
 * app.js 筆記
 *
 * 這個文件是動漫歌曲管理系統的入口文件，負責初始化 Express 應用程序、連接數據庫、設置中間件和啟動服務器。
 * 以下是詳細說明：
 *
 * 1. **應用程序初始化**
 *    - 使用 `express()` 創建 Express 應用程序實例。
 *    - 設置模板引擎為 EJS，並指定視圖文件的路徑為 `src/views`。
 *
 * 2. **數據庫連接**
 *    - 使用 `sequelize.authenticate()` 測試 MySQL 數據庫連接。
 *    - 如果連接成功，輸出 "Connected to MySQL"。
 *    - 如果連接失敗，輸出錯誤信息。
 *
 * 3. **中間件**
 *    - `express.json()`：解析請求體中的 JSON 數據。
 *    - `express.urlencoded({ extended: true })`：解析請求體中的 URL 編碼數據。
 *
 * 4. **路由**
 *    - 使用 `app.use('/', routes)` 加載定義的路由，處理所有請求。
 *
 * 5. **啟動服務器**
 *    - 使用 `app.listen()` 啟動服務器，並監聽配置文件中的端口號。
 *    - 啟動成功後，輸出服務器運行地址。
 *
 * 6. **Node.js 函式庫使用說明**
 *    - **Express**：
 *      - `express()`：創建 Express 應用程序實例。
 *      - `app.set()`：設置應用程序配置（如模板引擎、視圖路徑）。
 *      - `app.use()`：加載中間件或路由。
 *      - `app.listen()`：啟動服務器並監聽指定端口。
 *    - **Path**：
 *      - `path.join()`：用於拼接文件路徑，確保跨平台兼容性。
 *    - **Sequelize**：
 *      - `sequelize.authenticate()`：測試數據庫連接。
 *    - **Config**：
 *      - 從配置文件中讀取應用程序配置（如端口號）。
 *
 * 7. **未來改進**
 *    - 添加錯誤處理中間件，捕獲並處理未預期的錯誤。
 *    - 實現靜態文件服務，用於提供 CSS、JavaScript 等資源。
 *    - 添加日誌記錄中間件，記錄請求與響應信息。
 *    - 支持 HTTPS，提高應用程序的安全性。
 *
 * 8. **依賴**
 *    - `express`：用於創建 Web 服務器。
 *    - `path`：用於處理文件路徑。
 *    - `config`：用於讀取應用程序配置。
 *    - `sequelize`：用於連接 MySQL 數據庫。
 *    - `routes`：用於定義所有 API 和頁面路由。
 *
 * 9. **注意事項**
 *    - 確保配置文件中的端口號與服務器環境一致。
 *    - 如果數據庫連接失敗，需檢查數據庫配置和網絡連接。
 *    - 如果視圖文件路徑錯誤，可能導致頁面無法渲染。
 */