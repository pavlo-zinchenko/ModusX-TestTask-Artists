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

    async getSongsByArtist(artistId, limit, offset) {
        try {
            const result = await db.query(
                'SELECT * FROM songs WHERE artist_id = $1 LIMIT $2 OFFSET $3',
                [artistId, limit, offset]
            );

            if (!result.rows.length) {
                throw new ApiError(404, 'No songs found for this artist');
            }

            return result.rows;
        } catch (error) {
            console.error('Error getting songs by artist:', error.message);
            throw new ApiError(500, 'Failed to retrieve songs for this artist');
        }
    }

    async getTotalSongCount(artistId) {
        try {
            const result = await db.query(
                'SELECT COUNT(*) as count FROM songs WHERE artist_id = $1',
                [artistId]
            );

            if (!result.rows.length) {
                throw new ApiError(404, `No songs found for artist with ID ${artistId}`);
            }

            return result.rows[0].count;
        } catch (error) {
            console.error('Error getting total song count:', error.message);
            throw new ApiError(500, 'Failed to retrieve total song count');
        }
    }
}

module.exports = new ArtistService();
