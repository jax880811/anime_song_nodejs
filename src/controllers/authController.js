const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('login', { error: null }); // 確保傳遞 error 變數
  };
  
  exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
  
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).render('login', { error: '帳號或密碼錯誤' });
    }
  
    req.session.user = user;
    res.redirect('/crud');
  };

// 處理登出
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};