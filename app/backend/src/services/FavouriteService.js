const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class FavouriteService {
    async getFavourites(userId) {
        try {
            const result = await db.query(`
                SELECT s.id, s.cover, s.name, s.duration
                FROM favourites f
                JOIN songs s ON f.song_id = s.id
                WHERE f.user_id = $1
            `, [userId]);

            return { favouriteSongs: result.rows };
        } catch (error) {
            console.error('Error getting favourites:', error.message);
            throw new ApiError(500, 'Unable to fetch favourite songs');
        }
    }

    async getFavouritesPagination(ids) {
        try {
            const result = [];

            for (const id of ids) {
                const song = await db.query(`
                    SELECT s.id, s.cover, s.name, s.duration
                    FROM songs s
                    WHERE s.id = $1
                `, [id]);

                result.push(song.rows[0]);
            }

            return result;
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
