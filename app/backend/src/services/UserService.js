const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class UserService {
    async getUser(userId) {
        try {
            const result = await db.query(`
                SELECT id, name, email FROM users
                WHERE id = $1
            `, [userId]);

            if (result.rows.length === 0) {
                throw new ApiError(404, 'User not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting user:', error.message);
            throw new ApiError(500, 'Unable to fetch user data');
        }
    }

    async updateUser(userId, user) {
        try {
            const result = await db.query(`
                UPDATE users
                SET name = $1, email = $2
                WHERE id = $3
                RETURNING id, name, email
            `, [user.name, user.email, userId]);

            if (result.rows.length === 0) {
                throw new ApiError(404, 'User not found or update failed');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating user:', error.message);
            throw new ApiError(500, 'Unable to update user data');
        }
    }
}

module.exports = new UserService();
