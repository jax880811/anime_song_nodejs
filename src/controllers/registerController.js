const User = require('../models/User');

// 顯示註冊頁面
exports.getRegister = (req, res) => {
    res.render('register', { error: null }); // 確保傳遞 error 變數
  };

// 處理註冊請求
exports.postRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.redirect('/login');
  } catch (err) {
    res.status(400).render('register', { error: '註冊失敗（用戶名可能已被使用）' });
  }
};