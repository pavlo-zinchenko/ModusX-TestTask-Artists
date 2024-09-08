const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/index');
const ApiError = require('../utils/ApiError');

class AuthService {
    async register(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const result = await db.query(`
                INSERT INTO users (email, password, name)
                VALUES ($1, $2, $3)
                RETURNING id, email, name
            `, [user.email, hashedPassword, user.name]);

            const registeredUser = result.rows[0];
            const token = this.generateToken(registeredUser);

            return { user: registeredUser, token };
        } catch (error) {
            console.error('Error registering user:', error.message);

            if (error.code === '23505') {
                throw new ApiError(400, 'Email already exists');
            }

            throw new ApiError(500, error.message || 'Failed to register user');
        }
    }

    async login(user) {
        try {
            const result = await db.query(`
                SELECT id, email, name, password FROM users
                WHERE email = $1
            `, [user.email]);

            const authenticatedUser = result.rows[0];
            if (!authenticatedUser) {
                throw new ApiError(401, 'Invalid email or password');
            }

            const passwordMatch = await bcrypt.compare(user.password, authenticatedUser.password);
            if (!passwordMatch) {
                throw new ApiError(401, 'Invalid email or password');
            }

            const { password, ...userWithoutPassword } = authenticatedUser;

            const token = this.generateToken(userWithoutPassword);

            return { user: userWithoutPassword, token };
        } catch (error) {
            console.error('Error logging in:', error.message);
            throw new ApiError(500, error.message || 'Failed to login');
        }
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '1h' }
        );
    }
}

module.exports = new AuthService();
