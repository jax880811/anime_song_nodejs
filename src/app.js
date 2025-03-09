const express = require('express');
const path = require('path');
const config = require('./config/config');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

// 設置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 測試 MySQL 連接
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL'))
    .catch(err => console.error('Could not connect to MySQL', err));

// 中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/', routes);

// 啟動伺服器
app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});