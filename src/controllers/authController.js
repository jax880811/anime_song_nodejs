
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 顯示登入頁面
exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

// 處理登入並簽發 JWT
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).render('login', { error: '帳號或密碼錯誤' });
    }

    // 簽發 JWT（建議使用 .env 存 secret）
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'super-secret-key',
      { expiresIn: '1h' }
    );

    // 將 token 設定為 HttpOnly cookie 或傳回前端
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hour
    });

    res.redirect('/crud');
  } catch (error) {
    res.status(500).render('login', { error: '伺服器錯誤' });
  }
};

// 處理登出
exports.logout = (req, res) => {
  // 清除 token cookie
  res.clearCookie('token');
  res.redirect('/');
};
/*
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 顯示登入頁面
exports.getLogin = (req, res) => {
    res.render('login', { error: null }); // 確保傳遞 error 變數
  };

// 處理登入請求
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).render('login', { error: '帳號或密碼錯誤' });
  }

  // 保存用戶到 Session
  req.session.user = user;
  res.redirect('/crud');
};

// 處理登出
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
*/