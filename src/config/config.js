module.exports = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'anime_song',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '1qaz@WSX3edc'
    }
};