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
}

module.exports = new ArtistService();
