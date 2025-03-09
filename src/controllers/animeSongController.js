const AnimeSong = require('../models/AnimeSong');

// 獲取所有動漫歌曲
exports.getAnimeSongs = async (req, res) => {
    try {
        const songs = await AnimeSong.findAll();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 創建新的動漫歌曲
exports.createAnimeSong = async (req, res) => {
    try {
        const song = await AnimeSong.create(req.body);
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 根據歌曲名稱獲取單個動漫歌曲
exports.getAnimeSongByName = async (req, res) => {
    try {
        const song = await AnimeSong.findByPk(req.params.song_name);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 更新動漫歌曲
exports.updateAnimeSong = async (req, res) => {
    try {
        const [updated] = await AnimeSong.update(req.body, {
            where: { song_name: req.params.song_name }
        });
        if (!updated) return res.status(404).json({ message: 'Song not found' });
        const updatedSong = await AnimeSong.findByPk(req.params.song_name);
        res.json(updatedSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 刪除動漫歌曲
exports.deleteAnimeSong = async (req, res) => {
    try {
        const deleted = await AnimeSong.destroy({
            where: { song_name: req.params.song_name }
        });
        if (!deleted) return res.status(404).json({ message: 'Song not found' });
        res.json({ message: 'Song deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};