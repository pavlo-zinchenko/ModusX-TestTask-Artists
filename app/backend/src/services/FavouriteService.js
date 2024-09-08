const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class FavouriteService {
    async getFavourites(userId) {
        try {
            const result = await db.query(`
                SELECT song_id
                FROM favourites
                WHERE user_id = $1
            `, [userId]);

            return result.rows.map(row => row.song_id);
        } catch (error) {
            console.error('Error getting favourites:', error.message);
            throw new ApiError(500, 'Unable to fetch favourite songs');
        }
    }

    async addFavourite(userId, songId) {
        try {
            const result = await db.query(`
                INSERT INTO favourites (user_id, song_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, song_id) DO NOTHING
                RETURNING *
            `, [userId, songId]);

            if (!result.rows.length) {
                throw new ApiError(400, 'Favourite already exists');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error adding favourite:', error.message);
            throw new ApiError(500, 'Unable to add favourite song');
        }
    }

    async removeFavourite(userId, songId) {
        try {
            const result = await db.query(`
                DELETE FROM favourites
                WHERE user_id = $1 AND song_id = $2
                RETURNING *
            `, [userId, songId]);

            if (!result.rows.length) {
                throw new ApiError(404, 'Favourite not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error removing favourite:', error.message);
            throw new ApiError(500, 'Unable to remove favourite song');
        }
    }
}

module.exports = new FavouriteService();
