const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class ArtistService {
    async getArtists() {
        try {
            const result = await db.query(`
                SELECT id, name, avatar, songs_count FROM artists
            `);
            return result.rows;
        } catch (error) {
            console.error('Error getting artists:', error.message);
            throw new ApiError(500, 'Failed to retrieve artists');
        }
    }

    async getArtist(artistId) {
        try {
            const result = await db.query(`
                SELECT id, name, avatar, songs_count FROM artists
                WHERE id = $1
            `, [artistId]);

            if (!result.rows.length) {
                throw new ApiError(404, `Artist with ID ${artistId} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting artist:', error.message);
            throw new ApiError(500, 'Failed to retrieve artist');
        }
    }

    async getSongsByArtist(artistId, page = 1, limit = 5) {
        try {
            const offset = (page - 1) * limit;

            const countResult = await db.query(`
                SELECT COUNT(*) AS total FROM songs
                WHERE artist_id = $1
            `, [artistId]);

            const totalSongs = parseInt(countResult.rows[0].total, 10);

            if (totalSongs === 0) {
                throw new ApiError(404, `No songs found for artist with ID ${artistId}`);
            }

            const result = await db.query(`
                SELECT id, name, cover, duration FROM songs
                WHERE artist_id = $1
                LIMIT $2 OFFSET $3
            `, [artistId, limit, offset]);

            return {
                songs: result.rows,
                total: totalSongs,
                page,
                limit,
            };
        } catch (error) {
            console.error('Error getting songs by artist:', error.message);
            throw new ApiError(500, 'Failed to retrieve songs for artist');
        }
    }
}

module.exports = new ArtistService();
