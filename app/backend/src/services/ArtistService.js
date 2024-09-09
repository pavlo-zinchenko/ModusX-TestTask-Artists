const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class ArtistService {
    async getArtists(ids) {
        try {
            const queryText = `
                SELECT 
                    a.id, 
                    a.name, 
                    a.avatar, 
                    a.songs_count,
    
                    TO_CHAR(
                        FLOOR(SUM(
                            (SPLIT_PART(s.duration, ':', 1)::INT * 60) +   
                            SPLIT_PART(s.duration, ':', 2)::INT            
                        ) / 60), 'FM00') || ':' ||
                        TO_CHAR(
                        MOD(SUM(
                            (SPLIT_PART(s.duration, ':', 1)::INT * 60) +   
                            SPLIT_PART(s.duration, ':', 2)::INT            
                        ), 60), 'FM00') AS total_duration,
    
                    COALESCE(
                        SUM(CASE 
                            WHEN s.id = ANY($1) THEN 1 
                            ELSE 0 
                        END), 0
                    ) AS liked_count
    
                FROM artists a
                LEFT JOIN songs s ON s.artist_id = a.id
                GROUP BY a.id, a.name, a.avatar, a.songs_count;
            `;
            const queryParams = ids && ids.length > 0 ? [ids] : [[]];

            const result = await db.query(queryText, queryParams);

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
            const songsResult = await db.query(
                'SELECT * FROM songs WHERE artist_id = $1 LIMIT $2 OFFSET $3',
                [artistId, limit, offset]
            );

            return songsResult.rows;
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
