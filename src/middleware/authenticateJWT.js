const jwt = require('jsonwebtoken');

function checkJWTAuth(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.redirect('/login'); // 或 res.status(401).send('Token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'reweave880811');
    req.user = decoded; // 讓後續路由可以取得 user 資訊
    next();
  } catch (err) {
    return res.redirect('/login'); // 或 res.status(403).send('Invalid token');
  }
}

module.exports = checkJWTAuth;