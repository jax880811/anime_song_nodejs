const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const animeSongController = require('../controllers/animeSongController');
const path = require('path');

// 搜索音樂 (HTML)
router.get('/search', searchController.searchMusic);

// 搜索音樂 (API)
router.get('/api/search', searchController.searchMusicAPI);

// 動漫歌曲 CRUD 操作
router.get('/api/music', animeSongController.getAnimeSongs);
router.post('/api/music', animeSongController.createAnimeSong);
router.get('/api/music/:song_name', animeSongController.getAnimeSongByName);
router.put('/api/music/:song_name', animeSongController.updateAnimeSong);
router.delete('/api/music/:song_name', animeSongController.deleteAnimeSong);

router.get('/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud.html'));
});

module.exports = router;