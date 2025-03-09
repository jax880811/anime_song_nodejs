//const { AnimeSong } = require('../models');
const AnimeSong = require('../models/AnimeSong');
// 搜索音樂 (HTML 渲染)
exports.searchMusic = async (req, res) => {
    const query = req.query.q || '';
    let results = [];

    if (query) {
        results = await AnimeSong.findAll({
            where: {
                歌曲名稱: { [Op.like]: `%${query}%` }
            },
            attributes: ['歌曲名稱', '音樂網址']
        });
    }

    const allSongs = await AnimeSong.findAll();

    res.render('search_music', {
        query: query,
        results: results,
        allSongs: allSongs
    });
};

// 搜索音樂 (API)
exports.searchMusicAPI = async (req, res) => {
    const query = req.query.q || '';
    let results = [];

    if (query) {
        results = await AnimeSong.findAll({
            where: {
                歌曲名稱: { [Op.like]: `%${query}%` }
            },
            attributes: ['歌曲名稱', '音樂網址']
        });
    }

    res.json({ query: query, results: results });
};